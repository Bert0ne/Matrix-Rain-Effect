canvas = document.getElementById('Matrix');
context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
})
class Matrix {

	 katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
	 latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	 nums = '0123456789';
	 alphabet = this.katakana + this.latin + this.nums;
	 fontSize;
	 columns;
	 rainDrops = [];
	
	 constructor(rainSpeed, fSize) {
		this.fontSize = fSize;
		this.columns = canvas.width/this.fontSize;

		this.createColumns()
		this.rainInterval(rainSpeed);
		this.resizeListener();

	 }

	 addArrIndexLoop(number,operation) {
		 for(let i = 0; i < number; i++) {
			 operation == 'push' ? this.rainDrops.push(0) : this.rainDrops.pop()
		 }
	 } 

	 resizeListener() {
		 window.addEventListener('resize',() => {
			let rainDropsL = this.rainDrops.length;
			let columnsLength = Math.floor(window.innerWidth / this.fontSize)
			let currCol;

			if(columnsLength > rainDropsL){
				currCol = columnsLength - rainDropsL
				this.addArrIndexLoop(currCol, 'push')			
			}
			if(columnsLength < rainDropsL) {
				currCol = rainDropsL - columnsLength;
				this.addArrIndexLoop(currCol, '')			
			}
		 })
	 }

	 rainInterval(rainSpeed) {
		 setInterval(() => {
			 this.drawRainDrop()
		 }, rainSpeed);
	 }

	 createColumns(){
		 for(let i = 0; i < this.columns; i++) {
			 this.rainDrops[i] = '0'
		 }
	 }

	 drawRainDrop = () => {
		context.fillStyle = 'rgba(0, 0, 0, 0.05)';
		context.fillRect(0, 0, canvas.width, canvas.height);
		
		context.fillStyle = '#0F0';
		context.font = this.fontSize + 'px monospace';
	
		for(let i = 0; i < this.rainDrops.length; i++)
		{
			const text = this.alphabet.charAt(Math.floor(Math.random() * this.alphabet.length));
			context.fillText(text, i * this.fontSize, this.rainDrops[i] * this.fontSize);
			
			if(this.rainDrops[i] * this.fontSize > canvas.height && Math.random() > 0.975){
				this.rainDrops[i] = 0;
			}
			this.rainDrops[i]++;
		}
	};
}
  
new Matrix(20, 16); // (rainSpeed, fontSize)