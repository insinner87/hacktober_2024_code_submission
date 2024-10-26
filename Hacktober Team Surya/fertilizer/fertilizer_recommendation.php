<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fertilizer Recommendation</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        body {
            background-color: #f8f9fa;
        }
        .section {
            padding: 30px;
        }
        .card {
            border-radius: 15px;
            margin-bottom: 20px;
        }
        .form-control {
            border-radius: 10px;
        }
        .btn-submit {
            border-radius: 10px;
        }
    </style>
</head>
<body>

<section class="section section-shaped section-lg">
    <div class="shape shape-style-1 shape-primary">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>

    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8 mx-auto text-center">
                <span class="badge badge-danger badge-pill mb-3">Recommendation</span>
            </div>
        </div>

        <div class="row">
            <div class="col-md-8 mx-auto">
                <div class="card text-white bg-gradient-success">
                    <form role="form" action="#" method="post">
                        <div class="card-header text-center">
                            <h4 class="text-info">Fertilizer Recommendation</h4>
                            <button type="submit" value="Recommend" name="Fert_Recommend" class="btn btn-warning btn-submit float-right">SUBMIT</button>
                        </div>

                        <div class="card-body">
                            <table class="table table-striped table-hover table-bordered bg-gradient-white text-center">
                                <thead>
                                    <tr class="font-weight-bold text-default">
                                        <th>Nitrogen</th>
                                        <th>Phosphorus</th>
                                        <th>Potassium</th>
                                        <th>Temperature</th>
                                        <th>Humidity</th>
                                        <th>Soil Moisture</th>
                                        <th>Soil Type</th>
                                        <th>Crop</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input type='number' name='n' placeholder="Eg: 37" required class="form-control">
                                        </td>
                                        <td>
                                            <input type='number' name='p' placeholder="Eg: 0" required class="form-control">
                                        </td>
                                        <td>
                                            <input type='number' name='k' placeholder="Eg: 0" required class="form-control">
                                        </td>
                                        <td>
                                            <input type='number' name='t' placeholder="Eg: 26" required class="form-control">
                                        </td>
                                        <td>
                                            <input type='number' name='h' placeholder="Eg: 52" required class="form-control">
                                        </td>
                                        <td>
                                            <input type='number' name='soilMoisture' placeholder="Eg: 38" required class="form-control">
                                        </td>
                                        <td>
                                            <select name="soil" class="form-control" required>
                                                <option value="">Select Soil Type</option>
                                                <option value="Sandy">Sandy</option>
                                                <option value="Loamy">Loamy</option>
                                                <option value="Black">Black</option>
                                                <option value="Red">Red</option>
                                                <option value="Clayey">Clayey</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select name="crop" class="form-control" required>
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
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>

                <div class="card text-white bg-gradient-success">
                    <div class="card-header text-center">
                        <h4 class="text-success">Result</h4>
                    </div>
                    <div class="card-body">
                        <h4>
                            <?php 
                            if (isset($_POST['Fert_Recommend'])) {
                                $n = trim($_POST['n']);
                                $p = trim($_POST['p']);
                                $k = trim($_POST['k']);
                                $t = trim($_POST['t']);
                                $h = trim($_POST['h']);
                                $sm = trim($_POST['soilMoisture']);
                                $soil = trim($_POST['soil']);
                                $crop = trim($_POST['crop']);

                                echo "Recommended Fertilizer is : ";

                                $Jsonn = json_encode($n);
                                $Jsonp = json_encode($p);
                                $Jsonk = json_encode($k);
                                $Jsont = json_encode($t);
                                $Jsonh = json_encode($h);
                                $Jsonsm = json_encode($sm);
                                $Jsonsoil = json_encode($soil);
                                $Jsoncrop = json_encode($crop);

                                $command = escapeshellcmd("fertilizer_recommendation.py $Jsonn $Jsonp $Jsonk $Jsont $Jsonh $Jsonsm $Jsonsoil $Jsoncrop");
                                $output = passthru($command);
                                echo $output;					
                            }
                            ?>
                        </h4>
                    </div>
                </div>
            </div>
        </div>  
    </div>
</section>

<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.0.7/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
