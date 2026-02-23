from flask import Flask, request, jsonify
import google.generativeai as genai

app = Flask(__name__)

genai.configure(api_key="AIzaSyAq-DyWREgXzcWN2ofy031s-A8AiTwzV6E")

model = genai.GenerativeModel("gemini-2.5-flash")

@app.route("/story", methods=["POST"])
def story():
    try:
        data = request.get_json()

        prompt = f"""
        Crie uma história curta com:
        Personagens: {data.get("characters")}
        Personalidades: {data.get("personalities")}
        Gênero: {data.get("genre")}
        Detalhes: {data.get("details")}
        """

        response = model.generate_content(
            prompt,
            generation_config=genai.types.GenerationConfig(
                temperature=0.9,
            )
        )

        if response and response.parts:
            story_text = response.parts[0].text
            return jsonify({
                "story": story_text,
                "success": True
            }), 200

        return jsonify({"error": "Model did not return any content."}), 500

    except Exception as e:
        print("ERROR:", e)
        return jsonify({"error": str(e)}), 500
    
if __name__ == "__main__":
    app.run(debug=False, port=5000, host="0.0.0.0")