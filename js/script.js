(function () {
    /* Мобильное меню начало */
    $(".toggle-menu").click(function () {
        if ($("li.parrent").hasClass("no-border")) {
            $("li.parrent").removeClass("no-border");
        }
        if ($(".mobile-all-service").hasClass("active-item")) {
            $(".mobile-all-service").removeClass("active-item");
            $(".mobile-all-service-list").slideUp();
        }
        $(this).toggleClass("active-menu");
        $(".mobile-menu").toggleClass("mobile-menu-open");
        $("html").toggleClass("stopscrol-menu");
    });

    let desktopRes = window.matchMedia("(max-width: 992px)");

    function onClickBurger() {
        if (desktopRes.matches) {
            $(this).toggleClass("active-item");
            $(".mobile-all-service-list").slideToggle();
            $("li.parrent").toggleClass("no-border");
        }
    }
    $(".mobile-all-service").on("click", onClickBurger);
    window.addEventListener("resize", function () {
        if (!desktopRes.matches) {
            document.querySelector(".mobile-all-service-list").style.display =
                "block";
            document
                .querySelector(".mobile-all-service")
                .classList.remove("active-item");
        }
        /*else {
			document.querySelector('.mobile-all-service-list').style.display = 'none';
		} заккрывается когда меняешь ширину экрана*/
    });

    $(document).mouseup(function (e) {
        var $target = $(e.target);
        if (
            $target.closest(".mobile-menu").length == 0 &&
            $target.closest(".toggle-menu").length == 0 &&
            $(".mobile-menu").hasClass("mobile-menu-open")
        ) {
            $(".mobile-menu").removeClass("mobile-menu-open");
            $(".toggle-menu").removeClass("active-menu");
            $(".mobile-all-service").removeClass("active-item");
            $("li.parrent").removeClass("no-border");
            if (desktopRes.matches) {
                $(".mobile-all-service-list").slideUp();
            }
            $("html").toggleClass("stopscrol-menu");
        }
    });

    //Открытие списка машин в калькуляторе по клике на кнопку
    $("button.dropdown-cars").click(function () {
        $(".cars-list").toggleClass("cars-list-visible");
    });
    /*
	//Табы на машинах
	$(document).ready(function () {
		$('.car-slider-item').click(function () {
			$(this).parent().siblings().removeClass('active');
			$(this).parent().addClass('active');
			var icon = $(this).data('icon');
			$(icon).siblings().removeClass('active');
			$(icon).addClass('active');
		})
	});
*/
    //Аккордеон в Вакансиях
    $(document).ready(function () {
        $(".open-offer").click(function () {
            $(this).addClass("d-none");
            $(this).prev().slideToggle(300);
        });
        $(".close-offer").click(function () {
            $(this).parent().next().removeClass("d-none");
            $(this).parent().slideToggle(300);
        });
    });

    /* фиксированная кнопка*/
    $(".bottom-messengers .first-image").click(function () {
        $(".bottom-messengers .list-messengers").stop().fadeToggle(400);
        $(".bottom-messengers .first-image .close").stop().fadeToggle(300);
        $(".bottom-messengers .first-image .chat").stop().fadeToggle(300);
        $(this).children().toggleClass("active");
        if ($(".bottom-messengers .chat").hasClass("active")) {
            $(".bottom-messengers .messengers-text").stop().fadeIn(1600);
        } else {
            $(".bottom-messengers .messengers-text").stop().fadeOut(300);
        }
    });
    /* закрытие текствого блока*/
    $(".bottom-messengers .close-messengers-text").click(function () {
        $(this).parent().hide();
    });

    /* фиксация заднего фона*/
    $(".popup-form-background").on("scroll touchmove mousewheel", function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });

    /* Открытие заказа звонка в Автопарке нажатием на машину с добавлением названия машины*/
    $(".car-item .open-phone-form").click(function () {
        var cartitle = $(this).attr("data-title");
        $(".popup-form p.car span").text(cartitle);
        $(".popup-form p.call").addClass("d-none");
        $(".popup-form p.car").removeClass("d-none");
    });
    /* Открытие заказа звонка нажатием на заказ звонка с добавлением слова звонок*/
    $("#open-phone-form").click(function () {
        $(".popup-form h4").addClass("d-none");
        $(".popup-form p.car").addClass("d-none");
        $(".popup-form p.call").removeClass("d-none");
    });
    /* Открытие заказа звонка нажатием на машину услуги с добавлением названия машины*/
    $(".car-card button.open-phone-form").click(function () {
        var cartitle = $(this).attr("data-title");
        $(".popup-form p.car span").text(cartitle);
        $(".popup-form h4").addClass("d-none");
        $(".popup-form p.call").addClass("d-none");
        $(".popup-form p.car").removeClass("d-none");
    });
    /* открытие формы */
    $("button.open-phone-form").click(function () {
        $("#phone-form").addClass("active-form");
        var title = $(this).attr("data-type");
        $('[name="type"]').val(title);
    });
    /* закрытие формы */
    $(".close-form").click(function () {
        $("#phone-form").removeClass("active-form");
        $(".order-form").trigger("reset");
        $(".popup-form p.car").addClass("d-none");
        $(".popup-form p.call").addClass("d-none");
        $(".popup-form h4").removeClass("d-none");
    });

    // Форма Telegram
    $(".order-form").submit(function (e) {
        e.preventDefault();
        let th = $(this);

        let valLength = $(this)
            .find(".form-phone-input")
            .val()
            .replace(/[^0-9\.]/g, "").length;
        if (valLength >= 12) {
            $.ajax({
                type: "POST",
                url: "/telegram.php",
                data: th.serialize(),
                success: function () {
                    th.trigger("reset");
                    $(".form-result.success").addClass("act");
                    setTimeout(function () {
                        $(".form-result.success").removeClass("act");
                    }, 3000);
                    setTimeout(function () {
                        $(".popup-form-background").removeClass("active-form");
                    }, 3000);
                },
                error: function () {
                    th.trigger("reset");
                    $(".form-result.error").addClass("act");
                    setTimeout(function () {
                        $(".form-result.error").removeClass("act");
                    }, 3000);
                    setTimeout(function () {
                        $(".popup-form-background").removeClass("active-form");
                    }, 3000);
                },
            });
            return false;
        } else {
            th.trigger("reset");
            $(".form-result.error").addClass("act");
            setTimeout(function () {
                $(".form-result.error").removeClass("act");
            }, 3000);
        }
        
    });

    if (document.querySelector('input[type="tel"]')) {
        $('input[type="tel"]').inputmask({
            mask: "+38 (999) 999-99-99",
            showMaskOnHover: false,
        });
    }
    
    /*табы и карусель*/
    $(".tablist li").on("click", function () {
        $(".tablist li").removeClass("active-tab");
        $(".all-cars [data-id]").removeClass("active");
        $(this).addClass("active-tab");
        var id = $(this).attr("id");
        $(".all-cars [data-id=" + id + "]").addClass("active");
        var count = $(".all-cars .car-card.active").length;
        var sizezontainer = $("section.cars .all-cars").width();
        $("section.cars .all-cars").css({ "overflow-x": "scroll" });
        if (window.matchMedia("(max-width: 992px)").matches) {
            $("section.cars .slider-wrapper").width((254 + 30) * count - 30);
            var sizewraper = $("section.cars .slider-wrapper").width();
            if (sizezontainer + 16 > sizewraper) {
                $("section.cars .all-cars").css({ "overflow-x": "hidden" });
            }
        } else {
            $(".slider-wrapper").width((294 + 30) * count - 30);
            var sizewraper = $("section.cars .slider-wrapper").width();
            if (sizezontainer > sizewraper) {
                $("section.cars .all-cars").css({ "overflow-x": "hidden" });
            }
        }
    });

    var countdef = $(".all-cars .car-card.active").length;
    var sizecontainerdef = $("section.cars .all-cars").width();
    if (window.matchMedia("(max-width: 992px)").matches) {
        $("section.cars .slider-wrapper").width((254 + 30) * countdef - 30);
        var sizewraperdef = $("section.cars .slider-wrapper").width();
        if (sizecontainerdef + 16 > sizewraperdef) {
            $("section.cars .all-cars").css({ "overflow-x": "hidden" });
        }
    } else {
        $(".slider-wrapper").width((294 + 30) * countdef - 30);
        var sizewraperdef = $("section.cars .slider-wrapper").width();
        if (sizecontainerdef > sizewraperdef) {
            $("section.cars .all-cars").css({ "overflow-x": "hidden" });
        }
    }

    //для дефолтной загрузки, но не все машины
    /*var activetab = $('.active-tab').attr('id');
	$('.all-cars [data-id='+activetab+']').addClass('active');*/

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    

    // =========   АДРЕСИ ========= //

    //----------------------------Робота з ДОМ

    //--Block_1

    const input_city_1 = $('#city');
    const input_street_1 = $('#street');

    const selectCityWrap_1 = $('#select_city_1_wrap');
    const selectStreetWrap_1 = $('#select_street_1_wrap');

    const list_city_1 = $('#list_city_1');
    const list_street_1 = $('#list_street_1');
    

    let allCity_1 = [];
    let allStreet_1 = [];
    let cityRef_1 = null;
    let city_1 = '';
    let street_1 = '';
    let building_1 = '';
    let building_2 = '';
    let building_3 = '';
    let building_4 = '';
    let building_5 = '';
    let number = '';
    
    


    input_city_1.on('input', function (event) {
        // код обробки події onChange
        const inputCity = event.target.value;
        searchFirstCityFunc(inputCity)
        getFinalyFirstCity(event);
    });

    input_street_1.on('input', function (event) {
        // код обробки події onChange
        const inputStreet = event.target.value;
        serchFirstStreetFunc(inputStreet);
        getFinalyFirstStreet(event);
    });

    // для відправки в телеграм бот 
    $('#house').on('input', function() {
        building_1 = $(this).val();
    });
    $('#house2').on('input', function() {
        building_2 = $(this).val();
    });
    $('#house3').on('input', function() {
        building_3 = $(this).val();
    });
    $('#house4').on('input', function() {
        building_4 = $(this).val();
    });
    $('#house5').on('input', function() {
        building_5 = $(this).val();
    });
    $('#calc-phone').on('input', function() {
        number = $(this).val();
    });
      



    //--------------Основна логіка
    
// Додати обробник події на список вибору міст
    list_city_1.on('click', 'li', function() {

    
    // Отримати текст елемента li
    const selectedCityStart = $(this).text();
  
    // Встановити текст в поле input
    input_city_1.val(selectedCityStart);
    city_1 = selectedCityStart;

    
    
  
    // Зберегти значення Ref в змінну
    const selectedOption = list_city_1.find(`li:contains(${selectedCityStart})`);
    if (selectedOption.length) {
      cityRef_1 = selectedOption.data('id');
    }
  
    // Очистити список вибору
    list_city_1.empty();

    
  });


    // Додати обробник події на список вибору вулиць
    list_street_1.on('click', 'li', function() {
    // Отримати текст елемента li
    const selectedStreetStart = $(this).text();

    // Встановити текст в поле input
    input_street_1.val(selectedStreetStart);
    street_1 = selectedStreetStart;

    // Зберегти значення Ref в змінну
    const selectedOption = list_street_1.find(`li:contains(${selectedStreetStart})`);
    if (selectedOption.length) {
    streetRef_1 = selectedOption.data('id');
    }

    // Очистити список вибору
    list_street_1.empty();
    });

 

 

    const craeteFirstCityList = () => {
        list_city_1.empty(); // очищуємо список вибору
        if (allCity_1.length) {
            $.each(allCity_1, function(index, name) { // для кожного елемента в масиві allCity_1
                const li = $('<li>', { // створити елемент li
                    text: name.Present,
                    'data-id': name.Ref,
                    class: 'option_list-item'
                });
                list_city_1.append(li); // додати li до списку вибору
            });
        }
        selectCityWrap_1.append(list_city_1); // додати список вибору до сторінки
    };

  
    
    const craeteFirstStreetList = () => {
        list_street_1.empty(); // очищуємо список вибору
        if (allStreet_1.length) {
            $.each(allStreet_1, function(index, stret) { // для кожного елемента в масиві allStreet_1
                const li = $('<li>', { // створити елемент li
                    text: stret.Present,
                    class: 'option_list-item'
                });
                list_street_1.append(li); // додати li до списку вибору
            });
        }
        selectStreetWrap_1.append(list_street_1); // додати список вибору до сторінки
    };
    
    const getFinalyFirstCity = (event) => {
        const selectedOption = list_city_1.find(`li:contains(${event.target.value})`);
        if (selectedOption.length) {
            cityRef_1 = selectedOption.data('id');
        }
        city_1 = event.target.value;
    };
    
    const getFinalyFirstStreet = (event) => {
        street_1 = event.target.value;
    };

    //------Функції запитів

    const searchFirstCityFunc = async (inputCity) => {
        const obj = {
            "apiKey": "4cea96f5f222b09a9a9498f7d7ae7ad7",
            "modelName": "Address",
            "calledMethod": "searchSettlements",
            "methodProperties": {
                "CityName": `${inputCity}`,
                "Limit": "550",
                "Page": "1"
            }
        };

        const response = await $.ajax({
            url: 'https://api.novaposhta.ua/v2.0/json/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(obj)
        });

        const { data } = response;

        if (data.length !== 0) {
            data.forEach((item) => {
                allCity_1.splice(0, allCity_1.length);
                item.Addresses.forEach((el) => {
                    allCity_1.push(el);
                });
            });
            craeteFirstCityList();
        }
        return data;
    };

    const serchFirstStreetFunc = async (inputStreet) => {
        const obj = {
            "apiKey": "4cea96f5f222b09a9a9498f7d7ae7ad7",
            "modelName": "Address",
            "calledMethod": "searchSettlementStreets",
            "methodProperties": {
                "StreetName": `${inputStreet}`,
                "SettlementRef": `${cityRef_1}`,
                "Limit": "50"
            }
        };

        const response = await $.ajax({
            url: 'https://api.novaposhta.ua/v2.0/json/',
            method: 'POST',
            data: JSON.stringify(obj),
            dataType: 'json'
        });

        const { data } = response;

        if (data.length != 0) {
            data.forEach((item) => {
                allStreet_1.splice(0, allStreet_1.length);
                item.Addresses.forEach((el) => {
                    allStreet_1.push(el)
                })
            })
            craeteFirstStreetList();
        }
        return data;
    };

// блок 2, вибір міста


const input_city_2 = $('#city2');
    const input_street_2 = $('#street2');

    const selectCityWrap_2 = $('#select_city_2_wrap');
    const selectStreetWrap_2 = $('#select_street_2_wrap');

    const list_city_2 = $('#list_city_2');
    const list_street_2 = $('#list_street_2');
    

    let allCity_2 = [];
    let allStreet_2 = [];
    let cityRef_2 = null;
    let city_2 = '';
    let street_2 = '';
    
    
    


    input_city_2.on('input', function (event) {
        // код обробки події onChange
        const inputCity = event.target.value;
        searchSecondCityFunc(inputCity)
        getFinalySecondCity(event);
    });

    input_street_2.on('input', function (event) {
        // код обробки події onChange
        const inputStreet = event.target.value;
        serchSecondStreetFunc(inputStreet);
        getFinalySecondStreet(event);
    });
 


    //--------------Основна логіка
    
// Додати обробник події на список вибору міст
    list_city_2.on('click', 'li', function() {

    
    // Отримати текст елемента li
    const selectedCityStart = $(this).text();
  
    // Встановити текст в поле input
    input_city_2.val(selectedCityStart);
    city_2 = selectedCityStart;
  
    // Зберегти значення Ref в змінну
    const selectedOption = list_city_2.find(`li:contains(${selectedCityStart})`);
    if (selectedOption.length) {
      cityRef_2 = selectedOption.data('id');
    }
  
    // Очистити список вибору
    list_city_2.empty();
    
  });


    // Додати обробник події на список вибору вулиць
    list_street_2.on('click', 'li', function() {
    // Отримати текст елемента li
    const selectedStreetStart = $(this).text();

    // Встановити текст в поле input
    input_street_2.val(selectedStreetStart);
    street_2 = selectedStreetStart;

    // Зберегти значення Ref в змінну
    const selectedOption = list_street_2.find(`li:contains(${selectedStreetStart})`);
    if (selectedOption.length) {
    streetRef_2 = selectedOption.data('id');
    }

    // Очистити список вибору
    list_street_2.empty();
    });


    const craeteSecondCityList = () => {
        list_city_2.empty(); // очищуємо список вибору
        if (allCity_2.length) {
            $.each(allCity_2, function(index, name) { // для кожного елемента в масиві allCity_2
                const li = $('<li>', { // створити елемент li
                    text: name.Present,
                    'data-id': name.Ref,
                    class: 'option_list-item'
                });
                list_city_2.append(li); // додати li до списку вибору
            });
        }
        selectCityWrap_2.append(list_city_2); // додати список вибору до сторінки
    };
    
    const craeteSecondStreetList = () => {
        list_street_2.empty(); // очищуємо список вибору
        if (allStreet_2.length) {
            $.each(allStreet_2, function(index, stret) { // для кожного елемента в масиві allStreet_2
                const li = $('<li>', { // створити елемент li
                    text: stret.Present,
                    class: 'option_list-item'
                });
                list_street_2.append(li); // додати li до списку вибору
            });
        }
        selectStreetWrap_2.append(list_street_2); // додати список вибору до сторінки
    };
    
    const getFinalySecondCity = (event) => {
        const selectedOption = list_city_2.find(`li:contains(${event.target.value})`);
        if (selectedOption.length) {
            cityRef_2 = selectedOption.data('id');
        }
        city_2 = event.target.value;
    };
    
    const getFinalySecondStreet = (event) => {
        street_2 = event.target.value;
    };

    //------Функції запитів

    const searchSecondCityFunc = async (inputCity) => {
        const obj = {
            "apiKey": "4cea96f5f222b09a9a9498f7d7ae7ad7",
            "modelName": "Address",
            "calledMethod": "searchSettlements",
            "methodProperties": {
                "CityName": `${inputCity}`,
                "Limit": "550",
                "Page": "1"
            }
        };

        const response = await $.ajax({
            url: 'https://api.novaposhta.ua/v2.0/json/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(obj)
        });

        const { data } = response;

        if (data.length !== 0) {
            data.forEach((item) => {
                allCity_2.splice(0, allCity_2.length);
                item.Addresses.forEach((el) => {
                    allCity_2.push(el);
                });
            });
            craeteSecondCityList();
        }
        return data;
    };

    const serchSecondStreetFunc = async (inputStreet) => {
        const obj = {
            "apiKey": "4cea96f5f222b09a9a9498f7d7ae7ad7",
            "modelName": "Address",
            "calledMethod": "searchSettlementStreets",
            "methodProperties": {
                "StreetName": `${inputStreet}`,
                "SettlementRef": `${cityRef_2}`,
                "Limit": "50"
            }
        };

        const response = await $.ajax({
            url: 'https://api.novaposhta.ua/v2.0/json/',
            method: 'POST',
            data: JSON.stringify(obj),
            dataType: 'json'
        });

        const { data } = response;

        if (data.length != 0) {
            data.forEach((item) => {
                allStreet_2.splice(0, allStreet_2.length);
                item.Addresses.forEach((el) => {
                    allStreet_2.push(el)
                })
            })
            craeteSecondStreetList();
        }
        return data;
    };




//---Block_3

const input_city_3 = $('#city3');
    const input_street_3 = $('#street3');

    const selectCityWrap_3 = $('#select_city_3_wrap');
    const selectStreetWrap_3 = $('#select_street_3_wrap');

    const list_city_3 = $('#list_city_3');
    const list_street_3 = $('#list_street_3');
    

    let allCity_3 = [];
    let allStreet_3 = [];
    let cityRef_3 = null;
    let city_3 = '';
    let street_3 = '';
    
    
    


    input_city_3.on('input', function (event) {
        // код обробки події onChange
        const inputCity = event.target.value;
        searchThirdCityFunc(inputCity)
        getFinalyThirdCity(event);
    });

    input_street_3.on('input', function (event) {
        // код обробки події onChange
        const inputStreet = event.target.value;
        serchThirdStreetFunc(inputStreet);
        getFinalyThirdStreet(event);
    });
 


    //--------------Основна логіка
    
// Додати обробник події на список вибору міст
    list_city_3.on('click', 'li', function() {

    
    // Отримати текст елемента li
    const selectedCityStart = $(this).text();
  
    // Встановити текст в поле input
    input_city_3.val(selectedCityStart);
    city_3 = selectedCityStart;
  
    // Зберегти значення Ref в змінну
    const selectedOption = list_city_3.find(`li:contains(${selectedCityStart})`);
    if (selectedOption.length) {
      cityRef_3 = selectedOption.data('id');
    }
  
    // Очистити список вибору
    list_city_3.empty();
    
  });


    // Додати обробник події на список вибору вулиць
    list_street_3.on('click', 'li', function() {
    // Отримати текст елемента li
    const selectedStreetStart = $(this).text();

    // Встановити текст в поле input
    input_street_3.val(selectedStreetStart);
    street_3 = selectedStreetStart;

    // Зберегти значення Ref в змінну
    const selectedOption = list_street_3.find(`li:contains(${selectedStreetStart})`);
    if (selectedOption.length) {
    streetRef_3 = selectedOption.data('id');
    }

    // Очистити список вибору
    list_street_3.empty();
    });







    const craeteThirdCityList = () => {
        list_city_3.empty(); // очищуємо список вибору
        if (allCity_3.length) {
            $.each(allCity_3, function(index, name) { // для кожного елемента в масиві allCity_3
                const li = $('<li>', { // створити елемент li
                    text: name.Present,
                    'data-id': name.Ref,
                    class: 'option_list-item'
                });
                list_city_3.append(li); // додати li до списку вибору
            });
        }
        selectCityWrap_3.append(list_city_3); // додати список вибору до сторінки
    };
    
    const craeteThirdStreetList = () => {
        list_street_3.empty(); // очищуємо список вибору
        if (allStreet_3.length) {
            $.each(allStreet_3, function(index, stret) { // для кожного елемента в масиві allStreet_3
                const li = $('<li>', { // створити елемент li
                    text: stret.Present,
                    class: 'option_list-item'
                });
                list_street_3.append(li); // додати li до списку вибору
            });
        }
        selectStreetWrap_3.append(list_street_3); // додати список вибору до сторінки
    };
    
    const getFinalyThirdCity = (event) => {
        const selectedOption = list_city_3.find(`li:contains(${event.target.value})`);
        if (selectedOption.length) {
            cityRef_3 = selectedOption.data('id');
        }
        city_3 = event.target.value;
    };
    
    const getFinalyThirdStreet = (event) => {
        street_3 = event.target.value;
    };

    //------Функції запитів

    const searchThirdCityFunc = async (inputCity) => {
        const obj = {
            "apiKey": "4cea96f5f222b09a9a9498f7d7ae7ad7",
            "modelName": "Address",
            "calledMethod": "searchSettlements",
            "methodProperties": {
                "CityName": `${inputCity}`,
                "Limit": "550",
                "Page": "1"
            }
        };

        const response = await $.ajax({
            url: 'https://api.novaposhta.ua/v2.0/json/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(obj)
        });

        const { data } = response;

        if (data.length !== 0) {
            data.forEach((item) => {
                allCity_3.splice(0, allCity_3.length);
                item.Addresses.forEach((el) => {
                    allCity_3.push(el);
                });
            });
            craeteThirdCityList();
        }
        return data;
    };

    const serchThirdStreetFunc = async (inputStreet) => {
        const obj = {
            "apiKey": "4cea96f5f222b09a9a9498f7d7ae7ad7",
            "modelName": "Address",
            "calledMethod": "searchSettlementStreets",
            "methodProperties": {
                "StreetName": `${inputStreet}`,
                "SettlementRef": `${cityRef_3}`,
                "Limit": "50"
            }
        };

        const response = await $.ajax({
            url: 'https://api.novaposhta.ua/v2.0/json/',
            method: 'POST',
            data: JSON.stringify(obj),
            dataType: 'json'
        });

        const { data } = response;

        if (data.length != 0) {
            data.forEach((item) => {
                allStreet_3.splice(0, allStreet_3.length);
                item.Addresses.forEach((el) => {
                    allStreet_3.push(el)
                })
            })
            craeteThirdStreetList();
        }
        return data;
    };


//---Block_4

const input_city_4 = $('#city4');
    const input_street_4 = $('#street4');

    const selectCityWrap_4 = $('#select_city_4_wrap');
    const selectStreetWrap_4 = $('#select_street_4_wrap');

    const list_city_4 = $('#list_city_4');
    const list_street_4 = $('#list_street_4');
    

    let allCity_4 = [];
    let allStreet_4 = [];
    let cityRef_4 = null;
    let city_4 = '';
    let street_4 = '';
    
    
    


    input_city_4.on('input', function (event) {
        // код обробки події onChange
        const inputCity = event.target.value;
        searchQuarterCityFunc(inputCity)
        getFinalyQuarterCity(event);
    });

    input_street_4.on('input', function (event) {
        // код обробки події onChange
        const inputStreet = event.target.value;
        serchQuarterStreetFunc(inputStreet);
        getFinalyQuarterStreet(event);
    });
 


    //--------------Основна логіка
    
// Додати обробник події на список вибору міст
    list_city_4.on('click', 'li', function() {

    
    // Отримати текст елемента li
    const selectedCityStart = $(this).text();
  
    // Встановити текст в поле input
    input_city_4.val(selectedCityStart);
    city_4 = selectedCityStart;
  
    // Зберегти значення Ref в змінну
    const selectedOption = list_city_4.find(`li:contains(${selectedCityStart})`);
    if (selectedOption.length) {
      cityRef_4 = selectedOption.data('id');
    }
  
    // Очистити список вибору
    list_city_4.empty();
    
  });


    // Додати обробник події на список вибору вулиць
    list_street_4.on('click', 'li', function() {
    // Отримати текст елемента li
    const selectedStreetStart = $(this).text();

    // Встановити текст в поле input
    input_street_4.val(selectedStreetStart);
    street_4 = selectedStreetStart;

    // Зберегти значення Ref в змінну
    const selectedOption = list_street_4.find(`li:contains(${selectedStreetStart})`);
    if (selectedOption.length) {
    streetRef_4 = selectedOption.data('id');
    }

    // Очистити список вибору
    list_street_4.empty();
    });


    const craeteQuarterCityList = () => {
        list_city_4.empty(); // очищуємо список вибору
        if (allCity_4.length) {
            $.each(allCity_4, function(index, name) { // для кожного елемента в масиві allCity_4
                const li = $('<li>', { // створити елемент li
                    text: name.Present,
                    'data-id': name.Ref,
                    class: 'option_list-item'
                });
                list_city_4.append(li); // додати li до списку вибору
            });
        }
        selectCityWrap_4.append(list_city_4); // додати список вибору до сторінки
    };
    
    const craeteQuarterStreetList = () => {
        list_street_4.empty(); // очищуємо список вибору
        if (allStreet_4.length) {
            $.each(allStreet_4, function(index, stret) { // для кожного елемента в масиві allStreet_4
                const li = $('<li>', { // створити елемент li
                    text: stret.Present,
                    class: 'option_list-item'
                });
                list_street_4.append(li); // додати li до списку вибору
            });
        }
        selectStreetWrap_4.append(list_street_4); // додати список вибору до сторінки
    };
    
    const getFinalyQuarterCity = (event) => {
        const selectedOption = list_city_4.find(`li:contains(${event.target.value})`);
        if (selectedOption.length) {
            cityRef_4 = selectedOption.data('id');
        }
        city_4 = event.target.value;
    };
    
    const getFinalyQuarterStreet = (event) => {
        street_4 = event.target.value;
    };

    //------Функції запитів

    const searchQuarterCityFunc = async (inputCity) => {
        const obj = {
            "apiKey": "4cea96f5f222b09a9a9498f7d7ae7ad7",
            "modelName": "Address",
            "calledMethod": "searchSettlements",
            "methodProperties": {
                "CityName": `${inputCity}`,
                "Limit": "550",
                "Page": "1"
            }
        };

        const response = await $.ajax({
            url: 'https://api.novaposhta.ua/v2.0/json/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(obj)
        });

        const { data } = response;

        if (data.length !== 0) {
            data.forEach((item) => {
                allCity_4.splice(0, allCity_4.length);
                item.Addresses.forEach((el) => {
                    allCity_4.push(el);
                });
            });
            craeteQuarterCityList();
        }
        return data;
    };

    const serchQuarterStreetFunc = async (inputStreet) => {
        const obj = {
            "apiKey": "4cea96f5f222b09a9a9498f7d7ae7ad7",
            "modelName": "Address",
            "calledMethod": "searchSettlementStreets",
            "methodProperties": {
                "StreetName": `${inputStreet}`,
                "SettlementRef": `${cityRef_4}`,
                "Limit": "50"
            }
        };

        const response = await $.ajax({
            url: 'https://api.novaposhta.ua/v2.0/json/',
            method: 'POST',
            data: JSON.stringify(obj),
            dataType: 'json'
        });

        const { data } = response;

        if (data.length != 0) {
            data.forEach((item) => {
                allStreet_4.splice(0, allStreet_4.length);
                item.Addresses.forEach((el) => {
                    allStreet_4.push(el)
                })
            })
            craeteQuarterStreetList();
        }
        return data;
    };

    //---Block_5

    const input_city_5 = $('#city5');
    const input_street_5 = $('#street5');

    const selectCityWrap_5 = $('#select_city_5_wrap');
    const selectStreetWrap_5 = $('#select_street_5_wrap');

    const list_city_5 = $('#list_city_5');
    const list_street_5 = $('#list_street_5');
    

    let allCity_5 = [];
    let allStreet_5 = [];
    let cityRef_5 = null;
    let city_5 = '';
    let street_5 = '';
    
    
    


    input_city_5.on('input', function (event) {
        // код обробки події onChange
        const inputCity = event.target.value;
        searchFifthCityFunc(inputCity)
        getFinalyFifthCity(event);
    });

    input_street_5.on('input', function (event) {
        // код обробки події onChange
        const inputStreet = event.target.value;
        serchFifthStreetFunc(inputStreet);
        getFinalyFifthStreet(event);
    });
 


    //--------------Основна логіка
    
    // Додати обробник події на список вибору міст
    list_city_5.on('click', 'li', function() {

    
    // Отримати текст елемента li
    const selectedCityStart = $(this).text();
  
    // Встановити текст в поле input
    input_city_5.val(selectedCityStart);
    city_5 = selectedCityStart;
  
    // Зберегти значення Ref в змінну
    const selectedOption = list_city_5.find(`li:contains(${selectedCityStart})`);
    if (selectedOption.length) {
      cityRef_5 = selectedOption.data('id');
    }
  
    // Очистити список вибору
    list_city_5.empty();
    
    });


    // Додати обробник події на список вибору вулиць
    list_street_5.on('click', 'li', function() {
    // Отримати текст елемента li
    const selectedStreetStart = $(this).text();

    // Встановити текст в поле input
    input_street_5.val(selectedStreetStart);
    street_5 = selectedStreetStart;

    // Зберегти значення Ref в змінну
    const selectedOption = list_street_5.find(`li:contains(${selectedStreetStart})`);
    if (selectedOption.length) {
    streetRef_5 = selectedOption.data('id');
    }

    // Очистити список вибору
    list_street_5.empty();
    });

    // адрес 1
    $('#city').on('input', function() {
        if ($(this).val().length > 2) {
          $('#list_city_1').removeClass('option_list--hidden');
          
        }  
    });
    $('#list_city_1').click(function() {
        $('#list_city_1').addClass('option_list--hidden');
      });

    $('#street').on('input', function() {
        if ($(this).val().length > 2) {
          $('#list_street_1').removeClass('option_list--hidden');
          
        }  
    });
    
    $('#list_street_1').click(function() {
        $('#list_street_1').addClass('option_list--hidden');
      });

    // адрес 2
    $('#city2').on('input', function() {
        if ($(this).val().length > 2) {
          $('#list_city_2').removeClass('option_list--hidden');
          
        }  
    });
    $('#list_city_2').click(function() {
        $('#list_city_2').addClass('option_list--hidden');
      });

    $('#street2').on('input', function() {
        if ($(this).val().length > 2) {
          $('#list_street_2').removeClass('option_list--hidden');
          
        }  
    });
    
    $('#list_street_2').click(function() {
        $('#list_street_2').addClass('option_list--hidden');
      });

    // адрес 3
    $('#city3').on('input', function() {
        if ($(this).val().length > 2) {
          $('#list_city_3').removeClass('option_list--hidden');
          
        }  
    });
    $('#list_city_3').click(function() {
        $('#list_city_3').addClass('option_list--hidden');
      });

    $('#street3').on('input', function() {
        if ($(this).val().length > 2) {
          $('#list_street_3').removeClass('option_list--hidden');
          
        }  
    });
    
    $('#list_street_3').click(function() {
        $('#list_street_3').addClass('option_list--hidden');
      });

    // адрес 4
    $('#city4').on('input', function() {
        if ($(this).val().length > 2) {
          $('#list_city_4').removeClass('option_list--hidden');
          
        }  
    });
    $('#list_city_4').click(function() {
        $('#list_city_4').addClass('option_list--hidden');
      });

    $('#street4').on('input', function() {
        if ($(this).val().length > 2) {
          $('#list_street_4').removeClass('option_list--hidden');
          
        }  
    });
    
    $('#list_street_4').click(function() {
        $('#list_street_4').addClass('option_list--hidden');
      });

    // адрес 5
    $('#city5').on('input', function() {
        if ($(this).val().length > 2) {
          $('#list_city_5').removeClass('option_list--hidden');
          
        }  
    });
    $('#list_city_5').click(function() {
        $('#list_city_5').addClass('option_list--hidden');
      });

    $('#street5').on('input', function() {
        if ($(this).val().length > 2) {
          $('#list_street_5').removeClass('option_list--hidden');
          
        }  
    });
    
    $('#list_street_5').click(function() {
        $('#list_street_5').addClass('option_list--hidden');
      });

    





    const craeteFifthCityList = () => {
        list_city_5.empty(); // очищуємо список вибору
        if (allCity_5.length) {
            $.each(allCity_5, function(index, name) { // для кожного елемента в масиві allCity_5
                const li = $('<li>', { // створити елемент li
                    text: name.Present,
                    'data-id': name.Ref,
                    class: 'option_list-item'
                });
                list_city_5.append(li); // додати li до списку вибору
            });
        }
        selectCityWrap_5.append(list_city_5); // додати список вибору до сторінки
    };
    
    const craeteFifthStreetList = () => {
        list_street_5.empty(); // очищуємо список вибору
        if (allStreet_5.length) {
            $.each(allStreet_5, function(index, stret) { // для кожного елемента в масиві allStreet_5
                const li = $('<li>', { // створити елемент li
                    text: stret.Present,
                    class: 'option_list-item'
                });
                list_street_5.append(li); // додати li до списку вибору
            });
        }
        selectStreetWrap_5.append(list_street_5); // додати список вибору до сторінки
    };
    
    const getFinalyFifthCity = (event) => {
        const selectedOption = list_city_5.find(`li:contains(${event.target.value})`);
        if (selectedOption.length) {
            cityRef_5 = selectedOption.data('id');
        }
        city_5 = event.target.value;
    };
    
    const getFinalyFifthStreet = (event) => {
        street_5 = event.target.value;
    };

    //------Функції запитів

    const searchFifthCityFunc = async (inputCity) => {
        const obj = {
            "apiKey": "4cea96f5f222b09a9a9498f7d7ae7ad7",
            "modelName": "Address",
            "calledMethod": "searchSettlements",
            "methodProperties": {
                "CityName": `${inputCity}`,
                "Limit": "550",
                "Page": "1"
            }
        };

        const response = await $.ajax({
            url: 'https://api.novaposhta.ua/v2.0/json/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(obj)
        });

        const { data } = response;

        if (data.length !== 0) {
            data.forEach((item) => {
                allCity_5.splice(0, allCity_5.length);
                item.Addresses.forEach((el) => {
                    allCity_5.push(el);
                });
            });
            craeteFifthCityList();
        }
        return data;
    };

    const serchFifthStreetFunc = async (inputStreet) => {
        const obj = {
            "apiKey": "4cea96f5f222b09a9a9498f7d7ae7ad7",
            "modelName": "Address",
            "calledMethod": "searchSettlementStreets",
            "methodProperties": {
                "StreetName": `${inputStreet}`,
                "SettlementRef": `${cityRef_5}`,
                "Limit": "50"
            }
        };

        const response = await $.ajax({
            url: 'https://api.novaposhta.ua/v2.0/json/',
            method: 'POST',
            data: JSON.stringify(obj),
            dataType: 'json'
        });

        const { data } = response;

        if (data.length != 0) {
            data.forEach((item) => {
                allStreet_5.splice(0, allStreet_5.length);
                item.Addresses.forEach((el) => {
                    allStreet_5.push(el)
                })
            })
            craeteFifthStreetList();
        }
        return data;
    };



    
    //додаємо додаткову адресу.

    let indexInput = 2; // зберігаємо індекс останнього елемента, з якого було видалено клас address-hidden
    let countBtn = 0;
    // додаємо обробник події click до кнопки з id="add"
    $("#add").click(function () {
        if (addressCount < 3) {
            addressCount++;
        }
        
        // знаходимо наступний елемент, в якому потрібно видалити клас address-hidden
        let $address = $(".address").eq(indexInput);

        // якщо знайдений елемент існує
        if ($address.length) {
            $address.removeClass("address-hidden"); // видаляємо клас address-hidden
            indexInput++; // збільшуємо індекс на 1

            calculateSum();
        }
        countBtn++;
        if (countBtn === 4) {
            $(".help-message").removeClass("address-hidden");
        }
    });

    $(".close__adress").click(function () {
        $(this).parent().addClass("address-hidden");
        countBtn--;
        indexInput--;
        addressCount--;
        
        calculateSum();
        if (indexInput < 5) {
            $(".help-message").addClass("address-hidden");
        }
    });

    // =========   ВАНТАЖНИКИ ========= //

    var personCount = $(".label__mover-active").data('person');
    // перемикання грузчиків
    $(".label__mover").on("click", function () {
        $(".label__mover-active").removeClass("label__mover-active");
        $(this).addClass("label__mover-active");
        personCount = $(".label__mover-active").data('person')
    });

    let car = $(".car-information-selected .car-name").text();

    // =========   АВТО ========= //
    
    // вибір авто
    $(".cars-list-item").on("click", function (e) {
        $(".car-information").removeClass("car-information-selected");
        $(this).find(".car-information").addClass("car-information-selected");
        car = $(".car-information-selected .car-name").text();;
        $(".dropdown-cars").html(
            $(".car-information-selected ").parent().html()
        );
        $(".cars-list").toggleClass("cars-list-visible");
                
    });

    $(document).on('click', function(event) {
        if (!$(event.target).closest('.calc-cars').length && !$(event.target).is('.calc-cars')) {
          $('.cars-list').removeClass("cars-list-visible")
        }
      });
  
    
    
    // =========   ГОДИНИ ========= //



    // Каунтер годин
    var timeAmount = $(".count-time .amount");
    var timeUnit = $(".count-time .unit");
    var incrementButton = $(".count-time .plus");
    var decrementButton = $(".count-time .minus");
    var minCarHours = 2;
    var minHours = 2; // Початкове значення годин
    var maxHours = 15; // Максимальне значення годин
    var amount = $('.amount').text();
    function updateDisplay() {
        timeAmount.text(minHours);
        // timeUnit.text(minHours === 1 ? "год." : "години");
    }

    function incrementHours() {
        if (minHours < maxHours) {
            minHours++;
            amount = $('.amount').text();
            updateDisplay();
            $(".warning").addClass("hidden");
        }
    }

    function decrementHours() {
        if (minHours > minCarHours) {
            minHours--;
            amount = $('.amount').text();
            updateDisplay();
        } else if ((minHours = minCarHours)) {
            $(".warning").removeClass("hidden");
            setTimeout(function () {
                $(".warning").addClass("hidden");
            }, 5000);
        }
    }

    

    $(".cars-list-item").click(function () {
        minCarHours = $(".dropdown-cars .car-name").data("minhours");
        minHours = minCarHours;
        timeAmount.text(minCarHours);
        $(".warning span").text(minCarHours);
    });

    incrementButton.on("click", incrementHours);
    decrementButton.on("click", decrementHours);

    updateDisplay();

    

    // =========   КАЛЕНДАР ========= //


        new AirDatepicker('#airdatepicker',{
        autoClose: true,
        showOtherMonths: false,
        minDate: new Date(),
        locale: {
            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            today: 'Today',
            clear: 'Clear',
            dateFormat: 'MM/dd/yyyy',
            timeFormat: 'hh:mm aa',
            firstDay: 0
        },
        

        })

    var newDate = '';
    $('.send').on("click", function(){
        var inputVal = $("#airdatepicker").val(); // получаем значение поля ввода
        newDate = inputVal; // сохраняем значение в переменную newDate
        

    });

    // =========  СУМА  ========= //


    // зберігаємо всі необхідні елементи у змінні
    var labelMovers = $(".label__mover");
    var carInformation = $(".car-information");
    var plusButton = $(".plus");
    var minusButton = $(".minus");
    var addressCount = 0;
    var sumPrice = $(".sum-price");
    var additionalSum = 0;
    
    
 
    

    
    // функція для обрахунку суми
    function calculateSum() {
        // отримуємо необхідні значення з відповідних атрибутів
        var person = parseInt(
            labelMovers.filter(".label__mover-active").data("person")
        );
        //   var person = $('.label__mover-active').data('person');
        var personHours = parseInt(
            labelMovers.filter(".label__mover-active").data("pricehours")
        );
        var priceHours = $(".dropdown-cars .car-name").data("pricehours");
        var innings = $(".dropdown-cars .car-name").data("innings");
        var moverAddAddress = parseInt(
            labelMovers.filter(".label__mover-active").data("add-address")
        );
        var carAddAddress = $(".dropdown-cars .car-name").data("additional");

        //   var amount = parseInt($('.amount').val());
        var amount = parseInt($(".amount").text());
        if (addressCount >= 1 && addressCount <= 3) {
            additionalSum = (moverAddAddress + carAddAddress) * addressCount;
        } else {
            additionalSum = 0;
        }

        // розрахунок суми за заданою формулою
        var sum =
            person * (personHours * amount) +
            (priceHours * amount + innings) +
            additionalSum;

        // виведення суми на сторінку
        sumPrice.html(sum);
        //   var additional = $('.dropdown-cars .car-name').data('innings');
        
    }

    // виклик функції для підрахунку суми при завантаженні сторінки
    calculateSum();

    // обробник події для кліку на елемент з класом 'label__mover'
    labelMovers.click(function () {
        // змінюємо клас активного елемента
        labelMovers.removeClass("label__mover-active");
        $(this).addClass("label__mover-active");

        // перераховуємо суму
        calculateSum();
    });

    // обробник події для кліку на зміну авто
    $(".cars-list-item").click(function () {
        // перераховуємо суму
        calculateSum();
    });

    // обробник події для кліку на елемент з класом 'calc-time' або кнопку з класом 'plus'
    carInformation.add(plusButton).click(function () {
        // перераховуємо суму
        calculateSum();
    });
    // обробник події для кліку на елемент з класом 'calc-time' або кнопку з класом 'minus'
    carInformation.add(minusButton).click(function () {
        // перераховуємо суму
        calculateSum();
    });


    // перевірка кноки Замовити

        $("#calc-phone").on("keyup", function () {
        var inputValue = $(this).val();
        if (inputValue.indexOf("_") !== -1 || inputValue.length < 19) {
            // $("#error-number").text(
            //     "Помилка: не достатня кількість символів"
            // );
            $(".form-sent-error").removeClass('hidden');
			$("#submitPhoneBtn").prop("disabled", true);
            return false;
        } else {
            // $("#error-number").text("");
            $(".form-sent-error").addClass('hidden');
			$("#submitPhoneBtn").prop("disabled", false);
            return true;
        }
    });

    // =========  ТЕЛЕГРАМ ========= //


    // отримання URL
    var currentUrl = window.location.href;
    var newUrl = currentUrl.replace('https://gruzar.com.ua/', '');


    // Отримання типу кнопки замовлення (з калькулятору)

    
    $('.send').on("click", function(){
        
        let postCity1 = `${city_1} ${street_1} ${building_1}`;
        let postCity2 = `${city_2} ${street_2} ${building_2}`;
        let postCity3 = `${city_3} ${street_3} ${building_3}`;
        let postCity4 = `${city_4} ${street_4} ${building_4}`;
        let postCity5 = `${city_5} ${street_5} ${building_5}`;
        let postNumb = `${number}`;
        let postMovers = `${personCount}`;
        let postAmount = `${amount}`;
        let postCar = `${car}`;
        let postPrice = `${sumPrice.text()}`;

        let dataType = $('.submitPhoneBtn-calc').data('type');
        let page = $('.order-items input[name="page"]').val();

        

            var formData = {};
            if (postCity1.trim() !== '') {
            formData.city1 = postCity1;
            }
            if (postCity2.trim() !== '') {
            formData.city2 = postCity2;
            }
            if (postCity3.trim() !== '') {
            formData.city3 = postCity3;
            }
            if (postCity4.trim() !== '') {
            formData.city4 = postCity4;
            }
            if (postCity5.trim() !== '') {
            formData.city5 = postCity5;
            }
            formData.number = postNumb,
            formData.postMovers = postMovers,
            formData.postCar = postCar,
            formData.postAmount = postAmount,
            formData.price = postPrice
            formData.Date = newDate
            formData.type = dataType
            formData.page = page


        $(".form-sent").removeClass("hidden");
            setTimeout(function () {
                $(".form-sent").addClass("hidden");
            }, 3000);

            
        
        $.ajax({
            type: "POST",
            url: "/telegram-calculate.php",
            data: formData,
            success: function(response) {
                console.log(response);
            },
            error: function(xhr, status, error) {
                console.log("AJAX error: " + status + ' ' + error);
            }
        });

        setTimeout(() => {
            window.location.reload();
        }, 2000)
    });



    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*таб все машины */
    $(".tablist li#all").on("click", function () {
        $(".all-cars [data-id]").addClass("active");
        var count = $(".all-cars .car-card.active").length;
        $("section.cars .all-cars").css({ "overflow-x": "scroll" });
        if (window.matchMedia("(max-width: 992px)").matches) {
            $("section.cars .slider-wrapper").width((254 + 30) * count - 30);
        } else {
            $(".slider-wrapper").width((294 + 30) * count - 30);
        }
    });
    //фильтр в выполненых работах
    $("section .filter .select").click(function () {
        $("section .filter ul").toggleClass("open");
        $(document).mouseup(function (e) {
            var div = $("section .filter .select");
            if (!div.is(e.target) && div.has(e.target).length === 0) {
                // не по div не по span в div
                $("section .filter ul").removeClass("open");
            }
        });
    });

    //чекбоксы в статьях блога
    $(".article-content .things-list span.thing span.checkbox").click(
        function () {
            $(this).toggleClass("checked");
        }
    );

    //Плавный скрол по документу грант
    function animateScrollTo(targetID) {
        var topPos = $("body " + targetID).offset();
        $("body,html").animate({ scrollTop: topPos.top }, 1000);
    }
    $(".scrollto").click(function (e) {
        animateScrollTo($(this).attr("data-href"));
        e.preventDefault();
    });


    
})();



let Alex2 = '222';