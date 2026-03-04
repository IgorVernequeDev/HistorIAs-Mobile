from flask import Flask, request, jsonify
import google.generativeai as genai
import os
from dotenv import load_dotenv

app = Flask(__name__)

load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")

genai.configure(api_key=os.getenv("api_key"))

model = genai.GenerativeModel("gemini-2.5-flash-lite")

@app.route("/story", methods=["POST"])
def story():
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
            Crie uma história de tamanho {data.get("duration")} com base nas seguintes informações:
            Personagens e suas personalidades: 
            {formatted_characters}
            Gênero: {data.get("genre")}
            Incluir falas na história? {"Sim" if data.get("includeDialogues") else "Não"}
            {"Quantia de falas:" f" {data.get("dialogueCount")}" if data.get("includeDialogues") else ""}
            {"Informações adicionais:" f" {data.get("details")}" if data.get("details") else ""}
            
            Apenas escreva a história, sem usar '###' para os capítulos.
            """

        response = model.generate_content(
            prompt,
            generation_config=genai.types.GenerationConfig(temperature=0.7)
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
    
@app.route("/ping")
def ping():
    return {"status": "ok"}
    
if __name__ == "__main__":
    app.run(debug=False, port=5000, host="0.0.0.0")