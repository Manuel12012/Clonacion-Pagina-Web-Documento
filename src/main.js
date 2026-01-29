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

    setLabel(step);
    clearContainer();

    const input = createInput(step);

     //  Preview en tiempo real
    if(step.type !== "radio-group"){
        attachPreviewSync(input,step.id);
    }

    // wrapper
    const wrapper = createInputWrapper(input);

    // tooltip si existe
    if (step.tooltip) {
        const { infoBtn, tooltip } = createTooltip(step.tooltip);
        wrapper.appendChild(infoBtn);
        wrapper.appendChild(tooltip);
    }

    container.appendChild(wrapper);

    activarPreviews(step.id);
    updateNavigation();
}

renderStep()
updateProgress()

// FUNCIONES
function createInput(step){
     let element;

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

    element.id = 'dynamic-input';
    element.className = 'rounded-md border border-gray-400 p-2 w-full';

    return element;

}

function createInputWrapper(input){

    const wrapper = document.createElement('div');
    wrapper.className = 'relative flex items-center gap-2';
        wrapper.appendChild(input);

        return wrapper;
}

function createTooltip(text){
        const infoBtn = document.createElement('button');
            infoBtn.type = 'button';
            infoBtn.textContent = 'ℹ️';
            infoBtn.className = 'text-gray-400 hover:text-green-600';

        const tooltip = document.createElement('div');
            tooltip.className = `
            hidden absolute left-full ml-3 top-1/2 -translate-y-1/2
            bg-black text-white text-sm rounded-lg p-3 w-64 z-50
        `;

        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✕';
        closeBtn.className = 'text-xs';

        closeBtn.addEventListener('click', () => {
            tooltip.classList.add('hidden');
        });

        infoBtn.addEventListener('click', () => {
            tooltip.classList.toggle('hidden');
        });

        tooltip.appendChild(closeBtn);
        tooltip.appendChild(document.createTextNode(text));
        return{infoBtn,tooltip};
}

function attachPreviewSync(input, stepId){
        input.addEventListener('input', e => {
            const previews = document.querySelectorAll(
                `[data-preview="${stepId}"]`
            );
            const value = e.target.value || '_____';
            previews.forEach(span => (span.textContent = value));
        });
}

function updateNavigation(){
    prevBtn.classList.toggle('hidden', currentStep === 0);
}

function activarPreviews(stepId){
        document.querySelectorAll( `[data-preview="${stepId}"]`).
        forEach(span => span.classList.add('preview-active'));
    }
// HELPERS
function setLabel(step){
    label.textContent = step.label;
}

function clearContainer(){
    container.innerHTML = '';   
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



