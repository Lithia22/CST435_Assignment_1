// package svc;

// import io.grpc.Server;
// import io.grpc.ServerBuilder;
// import io.grpc.stub.StreamObserver;
// import distributed.ProcessorGrpc;
// import distributed.ProcessorOuterClass;

// public class App {

//     public static class Impl extends ProcessorGrpc.ProcessorImplBase {
//         @Override
//         public void process(ProcessorOuterClass.ProcessRequest req,
//                 StreamObserver<ProcessorOuterClass.ProcessReply> out) {
//             String text = req.getText();
//             String[] sentences = text.split("\\.");
//             String summary = sentences.length > 0 ? sentences[0] : "No summary";

//             out.onNext(ProcessorOuterClass.ProcessReply.newBuilder()
//                     .setResult("Java Summary: " + summary)
//                     .build());
//             out.onCompleted();
//         }
//     }

//     public static void main(String[] args) throws Exception {
//         Server server = ServerBuilder.forPort(50055)
//                 .addService(new Impl())
//                 .build()
//                 .start();
//         System.out.println("✅ Java Summary Service running at 50055");
//         server.awaitTermination();
//     }
// }

package svc;

import io.grpc.Server;
import io.grpc.ServerBuilder;
import io.grpc.stub.StreamObserver;
import io.grpc.protobuf.services.ProtoReflectionService; // ADD THIS IMPORT
import distributed.ProcessorGrpc;
import distributed.ProcessorOuterClass;

public class App {

    public static class Impl extends ProcessorGrpc.ProcessorImplBase {
        @Override
        public void process(ProcessorOuterClass.ProcessRequest req,
                StreamObserver<ProcessorOuterClass.ProcessReply> out) {
            String text = req.getText();
            String[] sentences = text.split("\\.");
            String summary = sentences.length > 0 ? sentences[0] : "No summary";

            out.onNext(ProcessorOuterClass.ProcessReply.newBuilder()
                    .setResult("Java Summary: " + summary)
                    .build());
            out.onCompleted();
        }
    }

    public static void main(String[] args) throws Exception {
        Server server = ServerBuilder.forPort(50055)
                .addService(new Impl())
                .addService(ProtoReflectionService.newInstance()) // ADD THIS LINE
                .build()
                .start();
        System.out.println("✅ Java Summary Service running at 50055");
        server.awaitTermination();
    }
}