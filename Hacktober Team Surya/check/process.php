<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <title>Fertilizer Recommendation</title>
    <style>
        body {
            background-color: #eef2f3; /* Light gray background for the whole page */
            font-family: 'Arial', sans-serif; /* Modern font */
        }
        .card {
            border-radius: 15px; /* Rounded corners for cards */
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Deeper shadow for depth */
            background-color: #ffffff; /* White card background */
        }
        .card-header {
            background-color: #6c63ff; /* Header background color */
            color: white; /* Header text color */
            border-top-left-radius: 15px; /* Round top-left corners */
            border-top-right-radius: 15px; /* Round top-right corners */
        }
        .btn-submit {
            margin-top: 1.5rem; /* Space above the submit button */
            background-color: #ff5722; /* Bright orange submit button */
            color: white; /* White text color */
            transition: background-color 0.3s; /* Smooth transition */
        }
        .btn-submit:hover {
            background-color: #e64a19; /* Darker orange on hover */
        }
        .result-card {
            margin-top: 1.5rem; /* Space above the result card */
            border-radius: 15px; /* Rounded corners */
            background-color: #6c63ff; /* Blue background for results */
            color: white; /* White text color */
            padding: 15px; /* Padding for result card */
        }
        h4 {
            font-weight: 600; /* Bold for result text */
        }
        .form-group {
            margin-bottom: 1.5rem; /* Space between fields */
        }
        input[type='number'], select {
            width: 100%; /* Full-width input */
            border: 1px solid #ced4da; /* Border color */
            border-radius: 8px; /* Rounded corners for inputs */
            padding: 10px; /* Padding for inputs */
            transition: border-color 0.3s; /* Smooth border color transition */
        }
        input[type='number']:focus, select:focus {
            border-color: #6c63ff; /* Focus border color */
            outline: none; /* Remove outline */
        }
        .result-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .header-title {
            color: #6c63ff; /* Modern title color */
            font-weight: bold; /* Bold title */
        }
    </style>
</head>
<body>
<section class="section section-shaped section-lg">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8 mx-auto text-center mb-3">
                <h2 class="header-title">Fertilizer Recommendation</h2> <!-- Updated title -->
            </div>
        </div>
        <div class="row row-content">
            <div class="col-md-12 mb-3">
                <div class="card text-dark bg-light mb-3">
                    <form role="form" action="#" method="post">
                        <div class="card-header">
                            <span class="display-4">Enter Soil and Crop Details</span>
                        </div>
                        <div class="card-body">
                            <div class="form-group">
                                <label for="n">Nitrogen:</label>
                                <input type='number' name='n' id="n" placeholder="Eg: 37" required class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="p">Phosphorus:</label>
                                <input type='number' name='p' id="p" placeholder="Eg: 0" required class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="k">Potassium:</label>
                                <input type='number' name='k' id="k" placeholder="Eg: 0" required class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="t">Temperature:</label>
                                <input type='number' name='t' id="t" placeholder="Eg: 26" required class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="h">Humidity:</label>
                                <input type='number' name='h' id="h" placeholder="Eg: 52" required class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="soilMoisture">Soil Moisture:</label>
                                <input type='number' name='soilMoisture' id="soilMoisture" placeholder="Eg: 38" required class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="soil">Soil Type:</label>
                                <select name="soil" id="soil" class="form-control">
                                    <option value="">Select Soil Type</option>
                                    <option value="Sandy">Sandy</option>
                                    <option value="Loamy">Loamy</option>
                                    <option value="Black">Black</option>
                                    <option value="Red">Red</option>
                                    <option value="Clayey">Clayey</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="crop">Crop:</label>
                                <select name="crop" id="crop" class="form-control">
                                    <option value="">Select Crop</option>
                                    <option value="Maize">Maize</option>
                                    <option value="Sugarcane">Sugarcane</option>
                                    <option value="Cotton">Cotton</option>
                                    <option value="Tobacco">Tobacco</option>
                                    <option value="Paddy">Paddy</option>
                                    <option value="Barley">Barley</option>
                                    <option value="Wheat">Wheat</option>
                                    <option value="Millets">Millets</option>
                                    <option value="Oil seeds">Oil seeds</option>
                                    <option value="Pulses">Pulses</option>
                                    <option value="Ground Nuts">Ground Nuts</option>
                                </select>
                            </div>
                            <button type="submit" value="Recommend" name="Fert_Recommend" class="btn btn-submit">SUBMIT</button>
                        </div>
                        <div class="result-container">
                            <div class="result-card">
                                <h4>
                                    <?php 
                                    if(isset($_POST['Fert_Recommend'])){
                                        $n=trim($_POST['n']);
                                        $p=trim($_POST['p']);
                                        $k=trim($_POST['k']);
                                        $t=trim($_POST['t']);
                                        $h=trim($_POST['h']);
                                        $sm=trim($_POST['soilMoisture']);
                                        $soil=trim($_POST['soil']);
                                        $crop=trim($_POST['crop']);

                                        echo "Recommended Fertilizer is: ";

                                        $Jsonn=json_encode($n);
                                        $Jsonp=json_encode($p);
                                        $Jsonk=json_encode($k);
                                        $Jsont=json_encode($t);
                                        $Jsonh=json_encode($h);
                                        $Jsonsm=json_encode($sm);
                                        $Jsonsoil=json_encode($soil);
                                        $Jsoncrop=json_encode($crop);

                                        $command = escapeshellcmd("fertilizer_recommendation.py $Jsonn $Jsonp $Jsonk $Jsont $Jsonh $Jsonsm $Jsonsoil $Jsoncrop");
                                        $output = passthru($command);
                                        echo $output;                    
                                    }
                                    ?>
                                </h4>
                            </div>
                        </div>
                    </form>
                </div>
            </div>  
        </div>
    </div>
</section>
</body>
</html>
