import './style.css';

//  Definición de pasos (PRIMERO)
const steps = [
    {
        id: 'direccion-domicilio',
        label: 'Dirección completa de la vivienda',
        placeholder: 'Ej. C/Rey, 10, 2°, Lima'
    },
    {
        id: 'metros-vivienda',
        label: 'Número de metros cuadrados construidos que dispone la vivienda:',
        placeholder: 'Escribe un numero ejem: 1'
    },
    {
        id: 'descripcion-vivienda',
        label: 'Describa las partes, dependencias o espacios que forman la vivienda:',
        placeholder: 'ejem: El salon cuenta con cocina americana, tres dormitorios, dos baños, un garaje, etc'
    },
    {
        id: 'vivienda-amoblada',
        label: '¿El arrendador entrega la vivienda amueblada?',
        placeholder: ''
    },
    {
        id: 'referencia-catastral',
        label: 'Introduzca la Referencia Catastral de la vivienda:',
        placeholder: 'Ej. 123C45GJ00678B'
    },
    {
        id: 'referencia-catastral',
        label: 'Introduzca la Referencia Catastral de la vivienda:',
        placeholder: 'Ej. 123C45GJ00678B',
        type: "checkbox"
    }
    
]

// 2 Estado
let currentStep = 0
const values = {}

// 3️ Elementos
const label = document.querySelector('#step-label')
const input = document.querySelector('#step-input')
const nextBtn = document.querySelector('#next-btn')
const prevBtn = document.querySelector('#prev-btn')

// 4️ Render
function renderStep() {
    const step = steps[currentStep]

    label.textContent = step.label
    input.checkbox = step.checkbox
    input.placeholder = step.placeholder
    input.value = values[step.id] || ''

    prevBtn.classList.toggle('hidden', currentStep === 0)
}

renderStep()

nextBtn.addEventListener('click', () => {
    const step = steps[currentStep]

    values[step.id] = input.value

    const previews = document.querySelectorAll(
        `[data-preview="${step.id}"]`
    )

    previews.forEach(preview => {
    preview.textContent = input.value || '_____'
    })

    if (currentStep < steps.length - 1) {
        currentStep++
        renderStep()
    }
})

prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--
        renderStep()
    }
})

