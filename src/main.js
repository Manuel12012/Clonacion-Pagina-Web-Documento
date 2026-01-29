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
        placeholder: 'Ej. C/Rey, 10, 2°, Lima',
        tooltip: 'Incluya calle, número, piso y ciudad.'
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
    const step = steps[currentStep];

    label.textContent = step.label;
    container.innerHTML = '';

    // ✅ Wrapper principal
    const wrapper = document.createElement('div');
    wrapper.className = 'relative flex items-center gap-2';

    let element;

    element.id = 'dynamic-input';
    element.className = 'rounded-md border border-gray-400 p-2 w-full';

    // 🔥 Preview en tiempo real
    element.addEventListener('input', e => {
        const previews = document.querySelectorAll(
            `[data-preview="${step.id}"]`
        );
        const value = e.target.value || '_____';
        previews.forEach(span => (span.textContent = value));
    });

    wrapper.appendChild(element);

    // 🟢 TOOLTIP CON ÍCONO
    if (step.tooltip) {
        const infoBtn = document.createElement('button');
        infoBtn.type = 'button';
        infoBtn.textContent = 'ℹ️';
        infoBtn.className = 'text-gray-400 hover:text-green-600';

        const tooltip = document.createElement('div');
        tooltip.className = `
        hidden absolute left-full ml-3 top-1/2 -translate-y-1/2
        bg-black text-white text-sm rounded-lg p-3 w-64 z-50
      `;

        const content = document.createElement('div');
        content.className = 'flex justify-between gap-2';

        const text = document.createElement('span');
        text.textContent = step.tooltip;

        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✕';
        closeBtn.className = 'text-xs';

        closeBtn.addEventListener('click', () => {
            tooltip.classList.add('hidden');
        });

        infoBtn.addEventListener('click', () => {
            tooltip.classList.toggle('hidden');
        });

        content.appendChild(text);
        content.appendChild(closeBtn);
        tooltip.appendChild(content);

        wrapper.appendChild(infoBtn);
        wrapper.appendChild(tooltip);
    }

    container.appendChild(wrapper);

    // 🔥 Resaltar preview activo
    const previews = document.querySelectorAll(
        `[data-preview="${step.id}"]`
    );
    previews.forEach(span => span.classList.add('preview-active'));

    prevBtn.classList.toggle('hidden', currentStep === 0);
}

renderStep()
updateProgress()

function createInput(step){
    switch (step.type) {
        case 'textarea':
            element = document.createElement('textarea');
            element.placeholder = step.placeholder || '';
            element.value = values[step.id] || '';
            break;

        case 'radio-group':
            element = document.createElement('div');
            element.className = 'flex flex-col gap-2';

            step.options.forEach(option => {
                const label = document.createElement('label');
                label.className = 'flex items-center gap-2';

                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = step.id;
                radio.value = option;
                radio.checked = values[step.id] === option;

                radio.addEventListener('change', () => {
                    values[step.id] = option;
                });

                label.appendChild(radio);
                label.appendChild(document.createTextNode(option));
                element.appendChild(label);
            });
            break;

        default:
            element = document.createElement('input');
            element.type = step.inputType || 'text';
            element.placeholder = step.placeholder || '';
            element.value = values[step.id] || '';
    }


}
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
        span.classList.remove('preview-active');
    });

    // 🔥 avanzar paso UNA SOLA VEZ
    if (currentStep < totalSteps - 1) {
        currentStep++;
        renderStep();
        updateProgress();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        renderStep();
        updateProgress();
    }
});

// funcion para calcular progreso
function updateProgress() {
    const percentage = (currentStep / (totalSteps - 1)) * 100;

    progressBar.style.width = `${percentage}%`;

    const text = document.getElementById('progress-text');
    if (text) {
        text.textContent = `Paso ${currentStep + 1} de ${totalSteps}`;
    }
}



