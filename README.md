# CST435 - Distributed Parallel & Sequential Text Processing System

## Team Members

- **Member 1**: Python Service (Text Analysis)
- **Member 2**: PHP Service (Sentiment Analysis)
- **Member 3**: C++ Service (Keyword Extraction)
- **Member 4**: Main Controller (Client) + Node.js Service (Language Detection)
- **Member 5**: Java Service (Text Summarization)

## Quick Start - Complete System

### Using Docker (Recommended)
```bash
# Clone the repository
git clone https://github.com/Lithia22/CST435.git
cd CST435

# Run all services together
docker compose up --build
```
## Individual Service Setup

Each service can run independently. Check individual READMEs in each service folder.

## Communication Protocols

- **gRPC**: Node.js, Python, Java, C++ Services
- **HTTP REST**: PHP Service

## How It Works

1. **You run the main program**
2. **It sends the same text** to all 5 services at the same time
3. **Each service processes the text differently:**
   - Python: Counts words, characters, and finds most frequent word
   - PHP: Checks if text is positive, negative or neutral
   - C++: Finds the top longest words
   - Node.js: Detects language and returns language code (eng, spa, fra, etc.)
   - Java: Creates a short summary
4. **All results come back** and are displayed together
5. **Performance is measured** - shows how much faster parallel processing is vs sequential

## Example

**Input:**
```bash
Hello! This is a Distributed & Parallel Text Processing System. This is CST435. Finally done.
```

**Output:**
```bash
python: Words: 16, Most frequent: 'is' (2x)
php: PGP Sentiment: neutral
cpp: C++ Keywords: Distributed, Parallel, Processing, System
javascript: Detected Language Code: eng
java: Java Summary: Hello! This is a Distributed & Parallel Text Processing System.
```
