from flask import Flask, request, jsonify
import google.generativeai as genai

app = Flask(__name__)

genai.configure(api_key="AIzaSyC3zTzZhfzEk-ft0PcC7ZPZle1nJLRkU7Y")

model = genai.GenerativeModel("gemini-2.5-flash")

@app.route("/story", methods=["POST"])
def story():
    print("Generating Story...")
    try:
        data = request.get_json()
        
        characters = data.get("characters", [])

        formatted_characters = ""

        for char in characters:
            formatted_characters += f"""
        Nome: {char.get('name')}
        Personalidade: {char.get('personality')}
        """

        prompt = f"""
            Crie uma história {data.get("duration")} com base nas seguintes informações:
            Personagens e suas personalidades: 
            {formatted_characters}
            Gênero: {data.get("genre")}
            Detalhes: {data.get("details")}
            Incluir falas na história? {"Sim" if data.get("isChecked") else "Não"}

            ESCREVA APENAS A HISTÓRIA EM HTML.
            - Use <h2> para o título.
            - Use <p class="narracao"> para blocos de narração.
            - Use <p class="personagem-X"> para falas, onde X é um número único para cada personagem (comece em 1).
            - Use <ul>/<li> para listar personagens e detalhes adicionais.
            - Use estilos inline ou classes, mas **não dependa de nomes de personagens fixos**.
            - Diferencie cores e tamanhos entre narração e falas.
            - Faça uma distinção clara entre personagens usando estilos, não nomes.
            - Use <strong> e <em> para destaques.
            - Certifique-se de que o HTML seja legível, bonito e aplicável para qualquer quantidade de personagens.
            - Não repita os detalhes/informações da história na resposta (EX: Gênero: Romance Personagens: Igor...), apenas escreva a história em si.
            - TIRE OS ```html do começo e fim.
            """

        temperature = float(data.get("temperature", 1))
        
        response = model.generate_content(
            prompt,
            generation_config=genai.types.GenerationConfig(
                temperature=temperature
            )
        )

        if response and response.parts:
            return jsonify({
                "story": response.parts[0].text,
                "success": True
            }), 200
            
        return jsonify({"error": "Model did not return any content."}), 500

    except Exception as e:
        print("ERROR:", e)
        return jsonify({"error": str(e)}), 502
    
if __name__ == "__main__":
    app.run(debug=False, port=5000, host="0.0.0.0")