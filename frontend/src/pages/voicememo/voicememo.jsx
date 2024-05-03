import { React, useEffect, useRef, useState } from 'react';
import "stream";
import './voicememo.css';
// Uncomment one of the following import options:
import AWS from 'aws-sdk'; // Import entire SDK (optional)
// import AWS from 'aws-sdk/global'; // Import global AWS namespace (recommended)
import S3 from 'aws-sdk/clients/s3'; // Import only the S3 client
// Uncomment one of the following import options:
// import AWS from 'aws-sdk/global'; // Import global AWS namespace (recommended)

// used https://mdn.github.io/dom-examples/media/web-dictaphone/, took a lot of work to get it working with react

    const VoiceMemo = () => {
        // Set up basic variables for app
        const record = useRef('.record');
        const stop = useRef('.stop');
        const soundClips = useRef('.soundClips');
        const canvas = useRef('.canvas');
        const mainSection = useRef('.mainSection');

        const [file, setFile] = useState(null);
        const [uploading, setUploading] = useState(false);
        const [deleting, setDeleting] = useState(false);

        const allowedTypes = [
            'image/jpeg',
            'image/png',
            'application/pdf',
            'video/mp4',
            'video/quicktime',
            'audio/mpeg',
            'audio/wav',
            // Add more supported types as needed
          ];

        useEffect(() => {

        // Disable stop button while not recording
        stop.current.disabled = true;

        // Visualiser setup - create web audio api context and canvas
        let audioCtx;
        const canvasCtx = canvas.current.getContext("2d");

        // Main block for doing the audio recording
        if (navigator.mediaDevices.getUserMedia) {
            console.log("The mediaDevices.getUserMedia() method is supported.");

            const constraints = { audio: true };
            let chunks = [];

            let onSuccess = function (stream) {
                const mediaRecorder = new MediaRecorder(stream);

                visualize(stream);

                record.current.onclick = function () {
                    mediaRecorder.start();
                    console.log(mediaRecorder.state);
                    console.log("Recorder started.");
                    record.current.style.background = "red";

                    stop.current.disabled = false;
                    record.current.disabled = true;
                };

                stop.current.onclick = function () {
                    mediaRecorder.stop();
                    console.log(mediaRecorder.state);
                    console.log("Recorder stopped.");
                    record.current.style.background = "";
                    record.current.style.color = "";

                    stop.current.disabled = true;
                    record.current.disabled = false;
                };

                mediaRecorder.onstop = function (e) {
                    console.log("Last data to read (after MediaRecorder.stop() called).");

                    const clipName = prompt(
                        "Enter a name for your sound clip?",
                        "My unnamed clip"
                    );

                    const clipContainer = document.createElement("article");
                    const clipLabel = document.createElement("p");
                    const audio = document.createElement("audio");
                    const deleteButton = document.createElement("button");

                    clipContainer.classList.add("clip");
                    audio.setAttribute("controls", "");
                    deleteButton.textContent = "Delete";
                    deleteButton.className = "delete";
                    
                    clipContainer.appendChild(audio);
                    clipContainer.appendChild(clipLabel);
                    clipContainer.appendChild(deleteButton);
                    soundClips.current.appendChild(clipContainer);

                    audio.controls = true;
                    const audio_blob = new Blob(chunks, { type: mediaRecorder.mimeType });
                    chunks = [];
                    const audioURL = window.URL.createObjectURL(audio_blob);
                    audio.src = audioURL;
                    console.log("recorder stopped");

                    if (clipName === null) {
                        clipLabel.textContent = "My unnamed clip";
                    } else {
                        clipLabel.textContent = clipName;
                    }

                    const S3_BUCKET = "audioupload-s3bucket"; // Replace with your bucket name
                    const REGION = "us-east-1"; // Replace with your region
                
                    AWS.config.update({
                      accessKeyId: "AKIA5FTZAL2RMMTD5KOH",
                      secretAccessKey: "V2GaSaYC7HSmAh5wHDUzmZAFKg64jRT/uVEXUFnb",
                    });
                
                    const s3 = new S3({
                      params: { Bucket: S3_BUCKET },
                      region: REGION,
                    });

                    const params_del = {
                        Bucket: S3_BUCKET,
                        Key: clipName + '.wav'
                      };

                      const params_up = {
                        Bucket: S3_BUCKET,
                        Key: clipName + '.wav',
                        Body: audio_blob,
                      };

                    deleteButton.onclick = async (e) => {      
                                s3.deleteObject(params_del, function(err,data) {
                                    console.log(err, data) 
                                  }).promise();
                                e.target.closest(".clip").remove();
                                alert("File deleted successfully.");
                    };

                    const uploadFile = async() => {
                          s3.upload(params_up, function(err,data) {
                            console.log(err, data)
                          }).promise();
                          alert("File uploaded successfully.");
                      };

                    clipLabel.onclick = function () {
                        const existingName = clipLabel.textContent;
                        const newClipName = prompt("Enter a new name for your sound clip?");
                        if (newClipName === null) {
                            clipLabel.textContent = existingName;
                        } else {
                            clipLabel.textContent = newClipName;
                        }
                    };
                    
                    uploadFile();
                    
                };

                mediaRecorder.ondataavailable = function (e) {
                    chunks.push(e.data);
                };

            };

            let onError = function (err) {
                console.log("The following error occured: " + err);
            };

            navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
        } else {
            console.log("MediaDevices.getUserMedia() not supported on your browser!");
        }

        function visualize(stream) {
            if (!audioCtx) {
                audioCtx = new AudioContext();
            }

            const source = audioCtx.createMediaStreamSource(stream);

            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 2048;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            source.connect(analyser);

            draw();

            function draw() {
                const WIDTH = canvas.current.width;
                const HEIGHT = canvas.current.height;

                requestAnimationFrame(draw);

                analyser.getByteTimeDomainData(dataArray);

                canvasCtx.fillStyle = "rgb(200, 200, 200)";
                canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

                canvasCtx.lineWidth = 2;
                canvasCtx.strokeStyle = "rgb(0, 0, 0)";

                canvasCtx.beginPath();

                let sliceWidth = (WIDTH * 1.0) / bufferLength;
                let x = 0;

                for (let i = 0; i < bufferLength; i++) {
                    let v = dataArray[i] / 128.0;
                    let y = (v * HEIGHT) / 2;

                    if (i === 0) {
                        canvasCtx.moveTo(x, y);
                    } else {
                        canvasCtx.lineTo(x, y);
                    }

                    x += sliceWidth;
                }

                canvasCtx.lineTo(canvas.current.width, canvas.current.height / 2);
                canvasCtx.stroke();
            }
            
        }

        window.onresize = function () {
            canvas.current.width = mainSection.current.offsetWidth;
        };

        

        window.onresize();
    }, [])
        return (
                <div className="wrapper">

                    <header>
                        <h1>Create Confirmation Voice Memo</h1>
                        <h3>State your name, the name of the case, the date, that you will be in attendance. </h3>
                    </header>

                    <section className="main-controls" ref= { mainSection }>
                        <canvas className="visualizer" ref = { canvas } height="60px"></canvas>
                        <div id="buttons">
                            <button className="record" ref = { record }>Record</button>
                            <button className="stop" ref = { stop }>Stop</button>
                        </div>
                    </section>

                    <section className="sound-clips" ref= { soundClips }>

                    </section>

                </div>
        );
    };

export default VoiceMemo;
