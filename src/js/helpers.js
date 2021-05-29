function textCenterAlign(text)
{
    text.textAlign = "center";
	text.textBaseline = "middle";
}

function getRandomColor() {
    var letters = '456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}
 