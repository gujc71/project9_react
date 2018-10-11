
export default function ResizeImage(file, callback) {
	if (!file) { return;}
	var reader = new FileReader();
	reader.onload = function(e) {
		var img = document.createElement("img");
		img.src = e.target.result;
		img.onload = function(e) {
			var canvas = document.createElement("canvas");
			var ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0);

			var MAX_WIDTH = 100;
			var MAX_HEIGHT = 100;
			var width = img.width;
			var height = img.height;

			if (width > height) {
				if (width > MAX_WIDTH) {
					height *= MAX_WIDTH / width;
					width = MAX_WIDTH;
				}
			} else {
				if (height > MAX_HEIGHT) {
					width *= MAX_HEIGHT / height;
					height = MAX_HEIGHT;
				}
			}
			canvas.width = width;
			canvas.height = height;
			var newctx = canvas.getContext("2d");
			newctx.drawImage(img, 0, 0, width, height);

			var imageurl = canvas.toDataURL(file.type);
			
			if (callback) callback(imageurl);
			//document.getElementById('output').src = imageurl;
		}
	}
	reader.readAsDataURL(file);
}
