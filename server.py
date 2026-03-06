from flask import Flask, request, jsonify
from google import genai
import os
from dotenv import load_dotenv

app = Flask(__name__)

load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")

client = genai.Client()

@app.route("/story", methods=["POST"])
def story():
    try:
        data = request.get_json()
        
        characters = data.get("characters", [])

        formatted_characters = ""
        
        if data.get("language") == "Portugues_Brasil":
            for char in characters:
                formatted_characters += f"""
            Nome: {char.get('name')}
            Personalidade: {char.get('personality')}
            """
        else:
            for char in characters:
                formatted_characters += f"""
            Name: {char.get('name')}
            Personality: {char.get('personality')}
            """

        if data.get("language") == "Portugues_Brasil":
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
        else:
            prompt = f"""
            Create a {data.get("duration")} length story based on the following information:
            Characters and their personalities:
            {formatted_characters}
            Genre: {data.get("genre")}
            Include dialogues in the story? {"Yes" if data.get("includeDialogues") else "No"}
            {"Amount of dialogues:" f" {data.get('dialogueCount')}" if data.get("includeDialogues") else ""}
            {"Additional information:" f" {data.get('details')}" if data.get("details") else ""}

            Only write the story. Do not use '###' to separate chapters.
            """

        response = client.models.generate_content(
            model="gemini-2.5-flash-lite",
            contents=prompt
        )

        if response and response.parts:
            return jsonify({
                "story": response.parts[0].text,
                "success": True
            }), 200

        # Caso response seja vazio
        return jsonify({
            "story": "No response from model",
            "success": False
        }), 500

    except Exception as e:
        print("ERROR:", e)
        return jsonify({
            "story": "An error occurred. Try again later.",
            "success": False
        }), 502
    
@app.route("/ping")
def ping():
    return {"status": "ok"}
    
if __name__ == "__main__":
    app.run(debug=False, port=5000, host="0.0.0.0")