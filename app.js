$(function () {
  var body = $('body');
  $('section').height($(window).height() * 0.25);
  $('header').height($(window).height() * 0.25);
  var backgroundColor = {
    rgba: 'rgb',
    red: 0,
    green: 0,
    blue: 0,
    currentColor: function () {
      var colorString = [
        this.rgba,
        "(",
        this.red,
        ",",
        this.green,
        ",",
        this.blue,
        ")"
      ];
      return colorString.join('');
    },
    currentSwatch: function (color, value) {
      if (color === 'red') { return 'rgba(' + value + ',0,0,1)'; }
      if (color === 'green') { return 'rgba(0,' + value + ',0,1)'; }
      if (color === 'blue') { return 'rgba(0,0,' + value + ',1)'; }
    },
    oppositeColor: function () {
      var colorString = [
        this.rgba,
        "(",
        255 - this.red,
        ",",
        255 - this.green,
        ",",
        255 - this.blue,
        ")"
      ];
      return colorString.join('');
    },
    hexCode: function () {
      var red = this.red.toString(16) < 10 || /^[abcdef]{1}$/.test(this.red.toString(16)) ? 0 + this.red.toString(16) : this.red.toString(16)
      var green = this.green.toString(16) < 10 || /^[abcdef]{1}$/.test(this.green.toString(16))? 0 + this.green.toString(16) : this.green.toString(16)
      var blue = this.blue.toString(16) < 10 || /^[abcdef]{1}$/.test(this.blue.toString(16)) ? 0 + this.blue.toString(16) : this.blue.toString(16)
      return '#' + red + green + blue;
    }
  };

  var mouseMoveEvent = function (event) {
    var swatchedOver = $(this);
    var offsetInDiv = swatchedOver.offset();
    var relativeXCoord = event.pageX - offsetInDiv.left;
    var windowWidthFactor = 256 / $('section').width();
    var swatchColor = swatchedOver.attr('id').match(/[rgb]\w{2,4}/)[0];
    var swatchColorValue = 255 - Math.floor(relativeXCoord * windowWidthFactor);
    backgroundColor[swatchColor] = swatchColorValue;
    swatchedOver.find('h1').text(swatchColorValue);
    swatchedOver.find('span').text(swatchColorValue.toString(16));
    $('#rgb').text(backgroundColor.currentColor());
    $('#hex').text(backgroundColor.hexCode());
    body.css({background: backgroundColor.currentColor()});
    $('span, h1').css('color', backgroundColor.oppositeColor());
    $('#header-div').css('border-color', backgroundColor.oppositeColor());
  };

  var copyToClipboard = function () {
    var currentColorCode = $(this).data('color-code');
    prompt('CMD + C || CTRL + C, then enter to copy!', $('#' + currentColorCode).text() );
  };

  // var swipeEvent = function (event) {
  //   var swatchedOver = $(this);
  //   var offsetInDiv = swatchedOver.offset();
  //   var pageX = event.swipestart.coords[0] - event.swipestop.coords[0];
  //   console.log(pageX);
  //   var relativeXCoord = pageX - offsetInDiv.left;
  //   var windowWidthFactor = 256 / $('section').width();
  //   var swatchColor = swatchedOver.attr('id').match(/[rgb]\w{2,4}/)[0];
  //   var swatchColorValue = 255 - Math.floor(relativeXCoord * windowWidthFactor);
  //   backgroundColor[swatchColor] = swatchColorValue;
  //   swatchedOver.find('h1').text(swatchColorValue);
  //   swatchedOver.find('span').text(swatchColorValue.toString(16));
  //   $('#rgb').text(backgroundColor.currentColor());
  //   $('#hex').text(backgroundColor.hexCode());
  //   body.css({background: backgroundColor.currentColor(), transition: 'background .01s linear'});
  //   $('span, h1').css('color', backgroundColor.oppositeColor())
  //   console.log(backgroundColor.currentColor())
  //   console.log($('span').css('color'))
  // };

  $('section').on('mousemove', mouseMoveEvent)
              .on('click', function () { $(this).off('mousemove', mouseMoveEvent); })
              .on('dblclick', function () { $(this).on('mousemove', mouseMoveEvent); });
  $('.copy').on('click', copyToClipboard);


  // $('section').on('swipe', swipeEvent)
});