const buttonUp = document.querySelector('.ergonomics__circle-click-up'),
    buttonDown = document.querySelector('.ergonomics__circle-click-down'),
    ergonomicsImagesDefault = document.querySelector('.ergonomics__imagedefault'),
    ergonomicsImagesImageUp = document.querySelector('.ergonomics__imageUp');


        function addStyleDisplayBlock() {
            ergonomicsImagesDefault.style.display = 'none';
            ergonomicsImagesImageUp.style.display = 'block';
        }
        function addStyleDisplayNone() {
            ergonomicsImagesImageUp.style.display = 'none';
            ergonomicsImagesDefault.style.display = 'block';
        }


        buttonUp.addEventListener('click',addStyleDisplayBlock );
        buttonDown.addEventListener('click',addStyleDisplayNone );

