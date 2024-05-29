<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Change Success</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body>
    <div class="container d-flex justify-content-center align-items-center flex-column min-vh-100 ">
        <div class="p-4 card">
            <div class="card-body">
                <header class="mb-4">
                    <a href="#">
                        <img class="img-fluid" src="image/onsource_logo.png" alt="">
                    </a>
                </header>
                <h5 class="card-title mt-4">Password Reset Successfully!</h5>
                <p class="card-text text-black-50 mt-3"> 
                    "Congratulations! 🎉 We're pleased to inform you that your password has been successfully changed.
                    Your account security is our priority, and we appreciate your proactive action in updating your password. With this change, your account is now even more secure.
                    Thank you for choosing <span class="fw-medium text-primary">WorkwiseHR</span> . If you have any further questions or need assistance, feel free to reach out."</p>
                <a href="{{ $homepageUrl }}" class="btn card-link btn-primary">Go back to WorkwiseHR</a>
                <p class="card-text mt-4 text-black-50">© <span id="currentYear"></span> All Rights Reserved.</p>
            </div>
        </div>
       
    </div>
    

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script>
        document.getElementById("currentYear").textContent = new Date().getFullYear();
    </script>
</body>
</html>
