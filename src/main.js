import './style.css';

//  Definición de pasos (PRIMERO)
const steps = [
    {
        id: 'direccion-domicilio',
        label: 'Dirección completa de la vivienda',
        placeholder: 'Ej. C/Rey, 10, 2°, Lima'
    },
    {
        id: 'data-2',
        label: 'Nombre del arrendador',
        placeholder: 'Ej. Juan Pérez'
    },
    {
        id: 'data-3',
        label: 'DNI del arrendador',
        placeholder: 'Ej. 12345678'
    },
    {
        id: 'data-4',
        label: 'DNI del arrendador',
        placeholder: 'Ej. 12345678'
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

