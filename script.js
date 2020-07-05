
			let radius = 4;
			let spaceBetweenX = 20;
			let spaceBetweenY = 30;
			let backgroundEllipseColor = "#D0E3FF";
			function ellipse(cx,cy,rx,ry){
				let str = `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${backgroundEllipseColor}"/>`;
				return str;
			}
			function drawRowOfEllipses(rowNum,cols){
				let str = '';
				for (j = 0; j < cols; j++)
				{
					str += ellipse(j*(radius*2+spaceBetweenX)+radius,rowNum*(radius*2+spaceBetweenY)+radius,radius,radius);
				}
				return str;
			}
			function drawGroupOfEllipses(rows,cols,id){
				let str = '';
				str += `<svg id="${id}" width=${cols*radius*2+spaceBetweenX*(cols-1)} 
					height=${rows*radius*2+spaceBetweenY*(rows-1)}>`;
				for (i = 0; i < rows; i++)
				{
					str += `${drawRowOfEllipses(i,cols)}`;
				}
				str += "</svg>";
				return str;
			}
			function drawBigEllipses(){
				let str = '';
				str += "<svg id='bigEllipses'>";
				str += ellipse(640,document.body.clientHeight-200,230,245);
				str += ellipse(document.body.clientWidth-100,49,230,245);
				
				str += "</svg>";
				return str;
			}
