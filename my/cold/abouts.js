function createSnowflake() {
            const snowflake = document.createElement('div');
            snowflake.classList.add('snowflake');
            snowflake.innerText = '❄️';
            snowflake.style.left = Math.random() * 100 + 'vw';
            snowflake.style.fontSize = Math.random() * 10 + 10 + 'px'; 
            snowflake.style.opacity = Math.random() * 0.8 + 0.2;
            
            const duration = Math.random() * 3 + 2; 
            snowflake.style.animationDuration = duration + 's';

            document.body.appendChild(snowflake);
            setTimeout(() => {
                snowflake.remove();
            }, duration * 1000);
};
        setInterval(createSnowflake, 150)