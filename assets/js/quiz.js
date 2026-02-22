jQuery(document).ready(function ($) {
    var questions = [];
    var currentStep = 0;
    var answers = {}; // Utiliser un objet pour stocker les réponses par question
    var cityCounts = {}; // Tableau pour compter les occurrences de chaque ville

    // Requête AJAX pour obtenir les questions du quiz
    $.ajax({
        url: ajax_object.ajax_url,
        method: 'POST',
        data: {
            action: 'get_quiz_questions'
        },
        success: function (response) {
            if (response.success && response.data.length > 0) {
                questions = response.data;
                renderQuestion(currentStep);
            } else {
                console.error('No questions found');
            }
        },
        error: function (xhr, status, error) {
            console.error('AJAX error:', status, error);
        }
    });

    function renderQuestion(step) {
        if (questions.length === 0 || step >= questions.length) {
            console.error('Invalid step or no questions available');
            return;
        }

        const { question, options } = questions[step];
        const optionsHtml = options.map((option, index) => `
            <div class="group-input">
                <input type="radio" name="answer" id="option${index}" value="${option.cities.map(city => city.name).join(',')}">
                <label class="radio-container" for="option${index}">
                    ${option.answer}
                </label>
            </div>
        `).join('');

        $('#questionForm').html(`
            <h2>${question}</h2>
            <div class="options-container">${optionsHtml}</div>
        `);

        updateStepStatus();

        // Ajouter la classe pour animer le glissement à gauche (slide-left)
        if (step > 0) {
            if ($('.quiz').hasClass('slide-left')) {
                $('.quiz').removeClass('slide-left');
            }
            setTimeout(() => {
                $('.quiz').addClass('slide-left');
            }, 100);
        }

        // Afficher le bouton Submit uniquement à la dernière question
        if (step === questions.length - 1) {
            $('#questionForm').append(`
                <button type="submit" id="submitButton">${quizStrings.submitButtonText}</button>
            `);
            $('.timeline').hide();
        }
    }

    function updateStepStatus() {
        $('.step').removeClass('completed');
        $('.step:lt(' + currentStep + ')').addClass('completed');

        const timeline = $('.timeline');
        timeline.empty();

        for (let i = 0; i < questions.length; i++) {
            const stepDiv = $('<div class="step"></div>');
            if (i <= currentStep) {
                stepDiv.addClass('completed');
            }
            timeline.append(stepDiv);
        }
    }

    $(document).on('change', 'input[name="answer"]', function () {
        const selectedOption = $('input[name="answer"]:checked');
        if (selectedOption.length > 0) {
            const selectedValue = selectedOption.val();
            const question = questions[currentStep].question;
            answers[question] = selectedValue;

            // Compter les occurrences de chaque ville
            const selectedCities = selectedValue.split(',');
            selectedCities.forEach(city => {
                if (!cityCounts[city]) {
                    cityCounts[city] = 1;
                } else {
                    cityCounts[city]++;
                }
            });

            setTimeout(() => {
                currentStep++;
                if (currentStep < questions.length) {
                    renderQuestion(currentStep);
                }
            }, 1000);
        }
    });

    $(document).on('submit', '#questionForm', function (e) {
        e.preventDefault();

        // Trier les villes par fréquence
        const sortedCities = Object.keys(cityCounts).sort((a, b) => cityCounts[b] - cityCounts[a]);
        const topCities = sortedCities.slice(0, 2);

        
       
        let resultHtml = '';
        topCities.forEach((city, index) => {
            // Parcourir les options pour trouver les données de la ville
            let cityData;
            for (let question of questions) {
                for (let option of question.options) {
                    cityData = option.cities.find(c => c.name === city);
                    if (cityData) break;
                }
                if (cityData) break;
            }

            if (cityData) {
                const imageUrl = cityData.image_url ? cityData.image_url : 'default-image-url'; 
                resultHtml += `
                    <div>
                        <div class="image">
                            <img src="${imageUrl}" alt="${city}">
                        </div>
                        <p>${city}</p>
                    </div>
                `;
                if (index < topCities.length - 1) {
                    resultHtml += `<span>${quizStrings.OrText}</span>`;
                }
            }
        });

        $('.sectionReasualt .scools .content').html(resultHtml);
        $('.sectionquiz').addClass('hidden');
        $('.sectionReasualt').removeClass('hidden');

    });
});
