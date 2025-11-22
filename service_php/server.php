<?php
// Simple PHP HTTP server for sentiment analysis

// Set headers for JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    $text = strtolower($input['text'] ?? '');
    
    // Sentiment analysis
    $sentiment = "neutral";
    $positiveWords = ['good', 'love', 'great', 'happy', 'awesome', 'excellent', 'amazing'];
    $negativeWords = ['bad', 'hate', 'terrible', 'sad', 'horrible', 'awful', 'worst'];
    
    foreach ($positiveWords as $word) {
        if (strpos($text, $word) !== false) {
            $sentiment = "positive";
            break;
        }
    }
    
    foreach ($negativeWords as $word) {
        if (strpos($text, $word) !== false) {
            $sentiment = "negative";
            break;
        }
    }
    
    $result = ["result" => "PHP Sentiment: $sentiment"];
    echo json_encode($result);
    
    error_log("✅ PHP Processed: '$text' -> $sentiment");
    
} else {
    // For GET requests, just show service is running
    echo json_encode([
        "service" => "PHP Sentiment Analysis",
        "status" => "running",
        "endpoint" => "POST / with JSON {text: 'your text'}"
    ]);
}
?>