$(function () {
  var i, length;
  var reds = $('.red');
  var greens = $('.green');
  var blues = $('.blue');
  var body = $('body');
  var backgroundColor = {
    rgba: 'rgba',
    red: 0,
    green: 0,
    blue: 0,
    opacity: 1,
    currentColor: function () {
      var colorString = [
        this.rgba,
        "(",
        this.red,
        ",",
        this.green,
        ",",
        this.blue,
        ",",
        this.opacity,
        ")"
      ];
      return colorString.join('');
    },
    currentSwatch: function (color, value) {
      if (color === 'red') { return 'rgba(' + value + ',0,0,1)'; }
      if (color === 'green') { return 'rgba(0,' + value + ',0,1)'; }
      if (color === 'blue') { return 'rgba(0,0,' + value + ',1)'; }
    }
  };

  for (i = 0, length = reds.length; i < length; i += 1) {
    reds.eq(i).data('value', i);
    greens.eq(i).data('value', i);
    blues.eq(i).data('value', i);
  }

  $('.color').mouseenter(function () {
    var swatchedOver = $(this);
    var swatchColor = swatchedOver.attr('class').match(/[rgb]\w{2,4}/)[0];
    var swatchColorValue = swatchedOver.data('value');
    swatchedOver.css('background', backgroundColor.currentSwatch(swatchColor, swatchColorValue));
  });
  $('.color').mouseleave(function () {
    var swatchedOver = $(this);
    if (!swatchedOver.hasClass('clicked')) { swatchedOver.css('background', 'none'); }
  });
  $('.color').click(function () {
    var clickedSwatch = $(this);
    if (clickedSwatch.hasClass('clicked')) { return unclick()}
    var divColor = clickedSwatch.attr('class').match(/[rgb]\w{2,4}/)[0];
    backgroundColor[divColor] = clickedSwatch.data('value');
    body.css({background: backgroundColor.currentColor(), transition: 'background .01s linear'});
    $('.clicked.' + divColor ).toggleClass('clicked').css('background','none');
    clickedSwatch.toggleClass('clicked');

    function unclick() {
      var divColor = clickedSwatch.attr('class').match(/[rgb]\w{2,4}/)[0];
      clickedSwatch.toggleClass('clicked').css('background','none');
      backgroundColor[divColor] = 0;
      console.log(backgroundColor.currentColor())
      body.css('background', backgroundColor.currentColor());
    }
  });
});