document.addEventListener('DOMContentLoaded', () => {
    // Access the input, buttons, and result
    const input = document.getElementById('solve');
    const buttons = document.querySelectorAll('#buttons button');
    const answer = document.getElementById('answer');


    // Add functionality to each button
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.id === 'equals') {
                try {
                    input.value = eval(input.value
                        .replace(/\^/g, '**')
                        .replace(/π/g, '3.14')
                        .replace(/e/g, '2.72')
                        .replace(/√/g, '**(1/2)')
                        .replace(/(\d+)!/g, (match, p1) => {
                            let num = parseInt(p1);
                            let result = 1;
                            for (let i = 2; i
                                <= num; i++) {
                                result *= i;
                            }
                            return result;
                        })
                    );
                } catch {
                    input.value = 'Error';
                }
            } else if (button.id === 'clear') {
                input.value = '';
                evaluateExpression();
            } else if (button.id === 'backspace') {
                input.value = input.value.slice(0, -1);
                evaluateExpression();
            } else {
                input.value += button.innerText;
                evaluateExpression();
            }
        });
    });

    input.addEventListener('input', evaluateExpression);

    // Function for updating 'answer' in real time
    function evaluateExpression() {
        try {
            let expression = input.value
                .replace(/π/g, '3.14')
                .replace(/e/g, '2.72')
                .replace(/\^/g, '**')
                .replace(/√/g, '**(1/2)');
            expression = expression.replace(/(\d+)!/g, (match, p1) => {
                let num = parseInt(p1);
                let result = 1;
                for (let i = 2; i <= num; i++) {
                    result *= i;
                }
                return result;
            });

            answer.innerText = `Your answer is: ${eval(expression)}`;
        } catch {
            answer.innerText = 'Your answer is: ';
        }
    }
});
