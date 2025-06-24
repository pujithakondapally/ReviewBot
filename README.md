# 🛍️ ReviewBot — Product Review Assistant

**ReviewBot** is an intelligent, full-stack web application that assists users in analyzing and understanding product reviews through interactive features and powerful AI-driven insights. Leveraging **LLMs**, **sentiment analysis models**, and modern web technologies, this application enhances user experience and supports smarter buying decisions.

---

## 🚀 Features

- 🔍 **Product Review Scraper** using **Playwright**
- 📊 **Review Summarizer** powered by **LLMs**
- 💬 **Chatbot Assistant** integrated with **Llama** and **LangChain**
- 🤖 **Sentiment Analysis** using `sentiment-roberta-large-english`

---

## 🧠 AI & LLMs Used

| Task                   | Model Used                          |
|------------------------|-------------------------------------|
| Review Summarization   | `Mistral-7B`                        |
| Sentiment Analysis     | `sentiment-roberta-large-english`  |
| RAG Query Answering    | `Qwen` (Reader) + `Nomic Embed Text` |
| Conversational Chatbot | `Llama-2-7B-Chat-GGML` / `Llama 3` |

---

## 📚 How It Works

1. Users input a product name or link.
2. Playwright automates scraping of user reviews from e-commerce platforms.
3. The app:
   - Runs sentiment analysis on each review.
   - Summarizes key points using LLMs.
   - Provides contextual answers to user queries via RAG.
4. Users can chat with a product-aware assistant for insights.

---

## 💡 Use Cases

- Shoppers comparing multiple products.
- Sellers analyzing customer sentiment.
- Product review mining and summarization for dashboards.


