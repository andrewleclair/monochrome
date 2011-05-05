(function($) {

	$.fn.monochrome = function( red, green, blue, callback ) {
		
		var img_obj = $( this ).get( 0 );
        var imgW = img_obj.width;
        var imgH = img_obj.height;

		var canvas = document.createElement('canvas');
        var canvasContext = canvas.getContext('2d');
        canvas.width = imgW;
        canvas.height = imgH;

        canvasContext.drawImage(img_obj, 0, 0);
        var imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);

        for (var y = 0; y < imgPixels.height; y++)
		{
            for(var x = 0; x < imgPixels.width; x++)
			{
                var i = (y * 4) * imgPixels.width + x * 4;
                var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
				var factor = avg / 255;
				imgPixels.data[i]   = red + (255-red)*factor;
				imgPixels.data[i+1] = green + (255-green)*factor;
				imgPixels.data[i+2] = blue + (255-blue)*factor;		
            }
        }

        canvasContext.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
		$( this ).attr('src', canvas.toDataURL() );
		
		callback();
	};
	
})(jQuery);