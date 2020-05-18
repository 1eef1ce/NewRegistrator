<script
        src="https://code.jquery.com/jquery-3.4.1.min.js"
        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
        crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="assets/custom/bootstrap/js/bootstrap.min.js"></script>
<script src="assets/custom/slider-menu/slider-menu.jquery.js"></script>
<script src="assets/custom/swiper/js/swiper.min.js"></script>
<script src="js/main.js"></script>
<script>
    $(window).resize(function () {
        var width = $(window).width();
        if (width > 959){
            $( "header" ).load( "templates/header-issuer.php" );
        } else{
            $( "header" ).load( "templates/header-issuer-mobile.php" );
        }
    }).resize();
</script>
</body>
</html>