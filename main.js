

document.querySelector('html').classList.remove('no-js');
      if (!window.Cypress) {
        const scrollCounter = document.querySelector('.js-scroll-counter');

        AOS.init({
          mirror: true,
          offset: 400, 
          duration: 1000,
          once: false,
        });

        document.addEventListener('aos:in', function(e) {
          console.log('in!', e.detail);
        });

        // window.addEventListener('scroll', function() {
        //   scrollCounter.innerHTML = window.pageYOffset;
        // });
      }