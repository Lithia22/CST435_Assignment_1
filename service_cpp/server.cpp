#include <grpcpp/grpcpp.h>
#include "processor.grpc.pb.h"
#include <sstream>
#include <vector>
#include <algorithm>
#include <iostream>

using distributed::Processor;
using distributed::ProcessRequest;
using distributed::ProcessReply;

class Service final : public Processor::Service {
  grpc::Status Process(grpc::ServerContext* context,
                       const ProcessRequest* request,
                       ProcessReply* reply) override {
    std::string text = request->text();
    std::istringstream stream(text);
    std::vector<std::string> words;
    std::string word;

    // Extract words longer than 4 characters
    while (stream >> word) {
      if (word.size() > 4) {
        words.push_back(word);
      }
    }

    // Sort by length (longest first)
    std::sort(words.begin(), words.end(),
      [](const std::string& a, const std::string& b) { 
        return a.size() > b.size(); 
      });

    // Build result string with top 3 keywords
    std::string result = "C++ Keywords: ";
    for (int i = 0; i < 3 && i < words.size(); i++) {
      if (i > 0) result += ", ";
      result += words[i];
    }

    // If no keywords found
    if (words.empty()) {
      result = "C++ Keywords: No long words found";
    }

    reply->set_result(result);
    return grpc::Status::OK;
  }
};

int main() {
  grpc::ServerBuilder builder;
  builder.AddListeningPort("0.0.0.0:50053", grpc::InsecureServerCredentials());
  Service service;
  builder.RegisterService(&service);

  std::unique_ptr<grpc::Server> server(builder.BuildAndStart());
  std::cout << "C++ Keyword service running on 50053\n";
  server->Wait();
  return 0;
}