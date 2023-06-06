/**
* Template Name: MyPortfolio
* Updated: May 30 2023 with Bootstrap v5.3.0
* Template URL: https://bootstrapmade.com/myportfolio-bootstrap-portfolio-website-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Mostrar mensaje
   */
  function mostrarPopup() {
    // Mostrar el pop-up
    // document.getElementById("popup").style.display = "block";
  }

/** */

document.addEventListener("DOMContentLoaded", async function() {
  // Obtener los elementos que contienen "@"
  var elements = document.querySelectorAll("[id*='@']");

  // Recorrer los elementos y reemplazar el contenido con datos dinámicos
  for (const element of elements) {
    var fieldName = element.id.substring(1); // Obtener el nombre del campo sin el "@"
    if (fieldName === 'Imagen') {
      // Cargar la imagen en la etiqueta img
      cargarImagen(element);
    } else {
      // Obtener el valor dinámico para el campo
      var fieldValue = await obtenerValorDinamico(fieldName); // Esperar la resolución de la promesa
      console.log(fieldValue);

      // Reemplazar el contenido del elemento con el valor dinámico
      element.textContent = fieldValue;
    }
  }

  // Función para cargar la imagen en la etiqueta img
  async function cargarImagen(imgElement) {
    // Obtener el número entero de la variable de sesión proporcionada desde otro HTML
    var codigoAuto = parseInt(sessionStorage.getItem('codigoAuto'));
    console.log(codigoAuto);
    
    try {
      // Cargar el archivo JSON que contiene la información de los autos
      var response = await fetch('autos.json');
      var data = await response.json();

      // Buscar el auto en base al código proporcionado
      const auto = data.find(item => item.CodigoAuto === codigoAuto);
      if (auto && auto.Imagen) {
        // Asignar la imagen al atributo src de la etiqueta img
        imgElement.src = auto.Imagen;
      }
    } catch (error) {
      console.error('Error al cargar el archivo JSON:', error);
    }
  }

  // Función para obtener el valor dinámico para un campo específico
  async function obtenerValorDinamico(fieldName) {
    // Obtener el número entero de la variable de sesión proporcionada desde otro HTML
    var codigoAuto = parseInt(sessionStorage.getItem('codigoAuto'));
    console.log(codigoAuto);
    
    try {
      // Cargar el archivo JSON que contiene la información de los autos
      var response = await fetch('autos.json');
      var data = await response.json();

      // Buscar el auto en base al código proporcionado
      const auto = data.find(item => item.CodigoAuto === codigoAuto);
      if (auto) {
        // Devolver el valor del campo correspondiente
        console.log(auto[fieldName]);
        return auto[fieldName];
      } else {
        return "";
      }
    } catch (error) {
      console.error('Error al cargar el archivo JSON:', error);
      return "";
    }
  }
});



/** */

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * burgerMenu
   */
  const burgerMenu = select('.burger')
  on('click', '.burger', function(e) {
    burgerMenu.classList.toggle('active');
  })

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('#portfolio-grid');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.item',
      });

      let portfolioFilters = select('#filters a', true);

      on('click', '#filters a', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('active');
        });
        this.classList.add('active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()