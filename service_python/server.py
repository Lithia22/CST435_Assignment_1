# from concurrent import futures
# import grpc
# import processor_pb2
# import processor_pb2_grpc
# import re

# class ProcessorServicer(processor_pb2_grpc.ProcessorServicer):
#     def Process(self, request, context):
#         text = request.text
        
#         if not text.strip():
#             return processor_pb2.ProcessReply(result="No text provided")
        
#         # Word count logic
#         words = re.findall(r'\b\w+\b', text)
#         word_count = len(words)
        
#         # Character count
#         char_count = len(text)
        
#         # Most frequent word
#         if words:
#             word_freq = {}
#             for word in words:
#                 word_lower = word.lower()
#                 word_freq[word_lower] = word_freq.get(word_lower, 0) + 1
            
#             most_frequent_word = max(word_freq, key=word_freq.get)
#             most_frequent_count = word_freq[most_frequent_word]
#         else:
#             most_frequent_word = "N/A"
#             most_frequent_count = 0
        
#         result = f"Words: {word_count}, Chars: {char_count}, Most Frequent: '{most_frequent_word}' ({most_frequent_count}x)"
        
#         return processor_pb2.ProcessReply(result=result)

# def serve():
#     server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
#     processor_pb2_grpc.add_ProcessorServicer_to_server(ProcessorServicer(), server)
#     server.add_insecure_port('[::]:50051')
#     server.start()
#     print("Python gRPC server running on port 50051")
#     server.wait_for_termination()

# if __name__ == '__main__':
#     serve()


from concurrent import futures
import grpc
import sys
import os
import re

# Add current directory to Python path
sys.path.append('/app')

# Try to import the generated gRPC code
try:
    import processor_pb2
    import processor_pb2_grpc
except ImportError:
    # If not generated yet, generate it
    import subprocess
    subprocess.run([
        'python', '-m', 'grpc_tools.protoc', 
        '-I/proto', 
        '--python_out=.', 
        '--grpc_python_out=.', 
        '/proto/processor.proto'
    ], check=True)
    import processor_pb2
    import processor_pb2_grpc

class ProcessorServicer(processor_pb2_grpc.ProcessorServicer):
    def Process(self, request, context):
        text = request.text
        
        if not text.strip():
            return processor_pb2.ProcessReply(result="No text provided")
        
        # Word count logic
        words = re.findall(r'\b\w+\b', text)
        word_count = len(words)
        
        # Character count
        char_count = len(text)
        
        # Most frequent word
        if words:
            word_freq = {}
            for word in words:
                word_lower = word.lower()
                word_freq[word_lower] = word_freq.get(word_lower, 0) + 1
            
            most_frequent_word = max(word_freq, key=word_freq.get)
            most_frequent_count = word_freq[most_frequent_word]
        else:
            most_frequent_word = "N/A"
            most_frequent_count = 0
        
        result = f"Words: {word_count}, Chars: {char_count}, Most Frequent: '{most_frequent_word}' ({most_frequent_count}x)"
        
        return processor_pb2.ProcessReply(result=result)

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    processor_pb2_grpc.add_ProcessorServicer_to_server(ProcessorServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("Python gRPC server running on port 50051")
    server.wait_for_termination()

if __name__ == '__main__':
    serve()