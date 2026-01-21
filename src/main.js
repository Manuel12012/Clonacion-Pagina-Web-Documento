import './style.css';

//  Definición de pasos (PRIMERO)
/***********************
 * 1️⃣ CONFIGURACIÓN **/
const steps = [
    {
        id: 'direccion-domicilio',
        label: 'Dirección completa de la vivienda que se desea alquilar',
        type: 'input',
        inputType: 'text',
        placeholder: 'Ej. C/Rey, 10, 2°, Lima'
    },
    {
        id: 'metros-vivienda',
        label: 'Número de metros cuadrados construidos',
        type: 'input',
        inputType: 'number',
        placeholder: 'Ej. 120'
    },
    {
        id: 'descripcion-vivienda',
        label: 'Describa las partes de la vivienda',
        type: 'textarea',
        placeholder: 'Salón, cocina americana, dormitorios...'
    },
    {
        id: 'equipamiento-vivienda',
        label: '¿Esta amoblada?',
        type: 'radio-group',
        options: [
            "si",
            "no"
        ]
    }
]


let currentStep = 0;
const totalSteps = steps.length;

const values = {}

/***********************
 * 2️⃣ ELEMENTOS DOM
 ***********************/
const label = document.querySelector('#step-label')
const container = document.querySelector('#input-container')
const nextBtn = document.querySelector('#next-btn')
const prevBtn = document.querySelector('#prev-btn')
const fields = document.querySelectorAll(".contract-field")
const progressBar = document.getElementById("progress-bar")

/***********************
 * 3️⃣ RENDER DINÁMICO
 ***********************/
function renderStep() {
    const step = steps[currentStep]

    label.textContent = step.label
    container.innerHTML = ''

    let element

    switch (step.type) {
        case 'textarea':
            element = document.createElement('textarea')
            element.placeholder = step.placeholder || ''
            element.value = values[step.id] || ''
            break

        case 'checkbox':
            element = document.createElement('input')
            element.type = 'checkbox'
            element.checked = values[step.id] || false
            break

        case 'select':
            element = document.createElement('select')
            step.options.forEach(opt => {
                const option = document.createElement('option')
                option.value = opt
                option.textContent = opt
                element.appendChild(option)
            })
            element.value = values[step.id] || ''
            break

        case 'radio-group':
            element = document.createElement('div')
            element.className = 'flex flex-col gap-2'

            step.options.forEach(option => {
                const label = document.createElement('label')
                label.className = 'flex items-center gap-2'

                const radio = document.createElement('input')
                radio.type = 'radio'
                radio.name = step.id // 🔥 clave para selección única
                radio.value = option

                radio.checked = values[step.id] === option

                radio.addEventListener('change', () => {
                    values[step.id] = option
                })

                label.appendChild(radio)
                label.appendChild(document.createTextNode(option))
                element.appendChild(label)
            })
            break


        default: // input
            element = document.createElement('input')
            element.type = step.inputType || 'text'
            element.placeholder = step.placeholder || ''
            element.value = values[step.id] || ''
    }

    element.id = 'dynamic-input'
    element.className = 'rounded-md border border-gray-400 p-2 w-full'

    container.appendChild(element)

    prevBtn.classList.toggle('hidden', currentStep === 0)
}

renderStep()
updateProgress()


/***********************
 * 4️⃣ NAVEGACIÓN
 ***********************/
nextBtn.addEventListener('click', () => {
    const step = steps[currentStep];

    if (!['checkbox-group', 'radio-group'].includes(step.type)) {
        const input = document.querySelector('#dynamic-input');
        values[step.id] =
            step.type === 'checkbox'
                ? input.checked
                : input.value;
    }

    const previews = document.querySelectorAll(
        `[data-preview="${step.id}"]`
    );

    previews.forEach(span => {
        span.textContent = values[step.id] || '_____';
    });

    if (currentStep < steps.length - 1) {
        currentStep++;
        renderStep();
        updateProgress();
    }
});



// funcion para calcular progreso
function updateProgress() {
    const percentage = (currentStep / (totalSteps-1)) * 100;

    progressBar.style.width = `${percentage}%`;

    const text = document.getElementById('progress-text');
    if (text) {
        text.textContent = `Paso ${currentStep + 1} de ${totalSteps}`;
    }
}


prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        renderStep();
        updateProgress();
    }
});





console.log('nextBtn encontrados:', document.querySelectorAll('#next-btn').length);
console.log('prevBtn encontrados:', document.querySelectorAll('#prev-btn').length)


console.log('🚀 main.js cargado');
