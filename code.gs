const GEMINI_API_KEY = '在此填上你的API key';

// 處理前端的 POST 請求
function doPost(e) {
  try {
    const params = JSON.parse(e.postData.contents);
    const theme = params.theme || '日常問候';
    
    // 設計給 Gemini 的 Prompt，嚴格要求 JSON 格式
    const prompt = `你是一個專業的英語教師。請以「${theme}」為主題，產生5個符合該情境的實用英文句子。
    要求：
    1. 難度必須由淺入深（第1題單字量少且句型簡單，第5題最難）。
    2. 只能回傳 JSON 陣列格式，不要有任何 Markdown 標籤或額外文字。
    
    JSON 格式範例：
    [
      {"level": 1, "en": "How are you?", "zh": "你好嗎？"},
      {"level": 2, "en": "I would like to order a coffee.", "zh": "我想要點一杯咖啡。"}
    ]`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const payload = {
      "contents": [{"parts": [{"text": prompt}]}],
      "generationConfig": {
        "response_mime_type": "application/json", // 強制要求模型輸出 JSON
        "temperature": 0.7
      }
    };

    const options = {
      "method": "post",
      "contentType": "application/json",
      "payload": JSON.stringify(payload)
    };

    const response = UrlFetchApp.fetch(url, options);
    const jsonContext = JSON.parse(response.getContentText());
    
    // 提取 Gemini 的回覆內容
    const generatedText = jsonContext.candidates[0].content.parts[0].text;
    
    return ContentService.createTextOutput(generatedText)
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 處理 CORS 預檢請求 (OPTIONS)
function doOptions(e) {
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);
}
