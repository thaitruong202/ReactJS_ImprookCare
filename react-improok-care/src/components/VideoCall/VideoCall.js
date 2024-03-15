import React, { useEffect, useRef, useState } from "react";

const VideoCall = () => {
    const selfViewRef = useRef(null);
    const remoteViewRef = useRef(null);
    const audioSelectRef = useRef(null);
    const videoSelectRef = useRef(null);
    const [audioSource, setAudioSource] = useState("");
    const [videoSource, setVideoSource] = useState("");

    useEffect(() => {
        let signalingChannel;
        const pc = new RTCPeerConnection();
        let isPolite;
        let makingOffer = false;
        let ignoreOffer = false;

        const selfView = selfViewRef.current;
        const remoteView = remoteViewRef.current;
        const audioSelect = audioSelectRef.current;
        const videoSelect = videoSelectRef.current;

        const handleSignalingMessage = async ({ data }) => {
            const { polite, description, candidate } = JSON.parse(data);

            if (polite) {
                isPolite = polite;
            }

            try {
                if (description) {
                    const offerCollision =
                        description.type === "offer" &&
                        (makingOffer || pc.signalingState !== "stable");

                    ignoreOffer = offerCollision && !isPolite;
                    if (ignoreOffer) {
                        return;
                    }

                    await pc.setRemoteDescription(description);
                    if (description.type === "offer") {
                        await pc.setLocalDescription();
                        signalingChannel.send(
                            JSON.stringify({ description: pc.localDescription })
                        );
                    }
                } else if (candidate) {
                    try {
                        await pc.addIceCandidate(candidate);
                    } catch (error) {
                        if (!ignoreOffer) {
                            throw error;
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        const handleTrackEvent = ({ track }) => {
            console.log("Received remote track(s) ...");
            remoteView.srcObject = new MediaStream();
            remoteView.srcObject.addTrack(track);
        };

        const handleNegotiationNeeded = async () => {
            console.log("Negotiation is starting ...");
            try {
                makingOffer = true;
                await pc.setLocalDescription();
                signalingChannel.send(
                    JSON.stringify({ description: pc.localDescription })
                );
            } catch (error) {
                console.log(error);
            } finally {
                makingOffer = false;
            }
        };

        const handleIceCandidate = ({ candidate }) => {
            if (candidate) {
                signalingChannel.send(JSON.stringify({ candidate: candidate }));
            }
        };

        const getDevices = async () => {
            const mediaDevices = await navigator.mediaDevices.enumerateDevices();

            mediaDevices.forEach((device) => {
                const option = document.createElement("option");
                option.value = device.deviceId;
                option.text = device.label;

                if (device.kind === "videoinput") {
                    videoSelect.appendChild(option);
                } else if (device.kind === "audioinput") {
                    audioSelect.appendChild(option);
                }
            });
        };

        const start = async () => {
            if (window.stream) {
                window.stream.getTracks().forEach((track) => track.stop());
            }

            const constraints = {
                audio: { deviceId: { ideal: audioSource } },
                video: { deviceId: { ideal: videoSource } },
            };

            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia(
                    constraints
                );

                window.stream = mediaStream;
                mediaStream.getTracks().forEach((track) => pc.addTrack(track));
                selfView.srcObject = mediaStream;
            } catch (error) {
                if (error.name === "OverconstrainedError") {
                    console.log("Không thể đáp ứng các ràng buộc phương tiện yêu cầu.");
                } else {
                    console.log("Lỗi khi truy cập thiết bị phương tiện:", error);
                }
            }
        };

        const handleAudioChange = () => {
            setAudioSource(audioSelect.value);
        };

        const handleVideoChange = () => {
            setVideoSource(videoSelect.value);
        };

        const initVideoChat = async () => {
            signalingChannel = new WebSocket(
                // "ws://localhost:2024/IMPROOK_CARE/api/public/video-chat/"
                "ws://springboot-improokcare-production.up.railway.app/IMPROOK_CARE/api/public/video-chat/"
            );

            signalingChannel.onmessage = handleSignalingMessage;

            pc.ontrack = handleTrackEvent;

            pc.onnegotiationneeded = handleNegotiationNeeded;

            pc.onicecandidate = handleIceCandidate;

            audioSelect.addEventListener("change", handleAudioChange);
            videoSelect.addEventListener("change", handleVideoChange);

            await getDevices();
            await start();
        };

        initVideoChat();

        // return () => {
        //   // Clean up code (if needed)
        // };
    }, [audioSource, videoSource]);

    return (
        <>
            <div className="video">
                <video id="selfView" autoPlay ref={selfViewRef}></video>
                <video id="remoteView" autoPlay ref={remoteViewRef}></video>
            </div>
            <div className="select">
                <label htmlFor="audioSource">Audio source: </label>
                <select id="audioSource" ref={audioSelectRef}></select>
            </div>
            <div className="select">
                <label htmlFor="videoSource">Video source: </label>
                <select id="videoSource" ref={videoSelectRef}></select>
            </div>
        </>
    );
};

export default VideoCall;
