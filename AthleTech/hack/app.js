let video = document.getElementById('videoInput');
let canvas = document.getElementById('canvasOutput');
let ctx = canvas.getContext('2d');
let net;
let selectedPosture = 'Downward Dog'; // Default posture
const feedbackElement = document.getElementById('feedback');

// Define correct keypoints for each posture (Example coordinates)
const correctPostures = {
    "Downward Dog": {
        leftShoulder: { x: 200, y: 150 },
        rightShoulder: { x: 400, y: 150 },
        leftElbow: { x: 150, y: 200 },
        rightElbow: { x: 450, y: 200 },
        // Add more keypoints as needed
    },
    "Warrior II": {
        leftShoulder: { x: 200, y: 250 },
        rightShoulder: { x: 400, y: 250 },
        leftElbow: { x: 150, y: 300 },
        rightElbow: { x: 450, y: 300 },
        // Add more keypoints as needed
    },
};

document.getElementById('postureSelect').addEventListener('change', (event) => {
    selectedPosture = event.target.value;
    feedbackElement.textContent = ''; // Clear feedback on posture change
});

async function setupCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    return new Promise((resolve) => {
        video.onloadedmetadata = () => {
            resolve(video);
        };
    });
}

async function loadPoseNet() {
    net = await posenet.load();
    console.log('PoseNet model loaded');
}

async function detectPose() {
    const pose = await net.estimateSinglePose(video, { flipHorizontal: false });
    drawPose(pose);
    requestAnimationFrame(detectPose);
}

function drawPose(pose) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    pose.keypoints.forEach(keypoint => {
        if (keypoint.score > 0.5) {
            // Draw the keypoint
            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.arc(keypoint.position.x, keypoint.position.y, 5, 0, 2 * Math.PI);
            ctx.fill();
            
            // Draw the label for the keypoint
            ctx.fillStyle = 'black';
            ctx.font = '12px Arial'; // Set font size and style
            ctx.fillText(keypoint.part, keypoint.position.x + 10, keypoint.position.y - 10); // Adjusted position for clarity
        }
    });

    comparePosture(pose);
}

function comparePosture(currentPose) {
    const correctPosture = correctPostures[selectedPosture];

    let isCorrect = true;

    currentPose.keypoints.forEach(keypoint => {
        if (keypoint.score > 0.5 && correctPosture[keypoint.part]) {
            const correct = correctPosture[keypoint.part];
            const distance = Math.sqrt(Math.pow(correct.x - keypoint.position.x, 2) +
                                        Math.pow(correct.y - keypoint.position.y, 2));
            if (distance > 20) { // Threshold for posture correction
                isCorrect = false;
                feedbackElement.textContent = `Adjust your position for ${keypoint.part}`;
            }
        }
    });

    if (isCorrect) {
        feedbackElement.textContent = "Good posture!";
    }
}

async function main() {
    await setupCamera();
    await loadPoseNet();
    detectPose();
}

main();
