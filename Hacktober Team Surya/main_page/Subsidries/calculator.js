function calculateFertilizer() {
    var area = document.getElementById("cropArea").value;
    var fertilizerType = document.getElementById("fertilizerType").value;
    var result;

    // Simple logic for fertilizer requirement based on area and type
    if (fertilizerType === "urea") {
        result = area * 50; // Example: 50kg of Urea per acre
    } else if (fertilizerType === "dap") {
        result = area * 40; // Example: 40kg of DAP per acre
    }

    // Display result
    document.getElementById("result").innerHTML = "You need " + result + " kg of " + fertilizerType + " for your crop area.";
}
