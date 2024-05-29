<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Change WorkwiseHR</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body>
    <div class="container d-flex justify-content-center align-items-center flex-column min-vh-100 ">
        <div class="p-4 card">
            <div class="card-body">
                <header class=" mb-4">
                    <a href="#">
                        <img class="img-fluid" src="image/onsource_logo.png" alt="">
                    </a>
                </header>
              
                <form action="{{ route('password.update') }}" method="post" class="row g-3 needs-validation" novalidate>
                
                    @csrf
                    <input type="hidden" name="token" value="{{ $token }}">

                    <div class="mb-3 row mt-4">
                        <h5 class="card-title">PASSWORD CHANGE REQUEST</h5>
                        <h6 class="card-subtitle mb-2 fst-italic" style="opacity:0.5; font-size:12px; ">Input all fields below to change your password</h6>
                    </div>
                    
                    
                    <div class="mb-3 row ">
                        <label for="staticEmail" class="col-sm-2 col-form-label text-black-50">Email</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="email" name="email" value="{{ $email }}" >
                        </div>
                      </div>
                      <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label text-black-50">New Password</label>
                        <div class="col-sm-10">
                          <input type="password" class="form-control" id="password" name="password">
                          @error('password')
                             <span class=" text-danger fst-italic " style="opacity:0.7; font-size:12px; ">{{ $message }}</span>
                          @enderror
                       
                        </div>
                      </div>
                      <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label text-black-50">Confirm Password</label>
                        <div class="col-sm-10">
                          <input type="password" class="form-control" id="password_confirmation" name="password_confirmation">
                          @error('password_confirmation')
                          <span class=" text-danger fst-italic " style="opacity:0.7; font-size:12px; ">{{ $message }}</span>
                           @enderror
                        </div>
                      </div>
                    <div class="col-12">
                      <button class="btn btn-primary" style="opacity: 0.7;" type="submit">SUBMIT</button>
                    </div>
                  </form>
             
            </div>
        </div>
       
    </div>
    

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

</body>
</html>
