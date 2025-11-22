package distributed;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.59.0)",
    comments = "Source: processor.proto")
@io.grpc.stub.annotations.GrpcGenerated
public final class ProcessorGrpc {

  private ProcessorGrpc() {}

  public static final java.lang.String SERVICE_NAME = "distributed.Processor";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<distributed.ProcessorOuterClass.ProcessRequest,
      distributed.ProcessorOuterClass.ProcessReply> getProcessMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "Process",
      requestType = distributed.ProcessorOuterClass.ProcessRequest.class,
      responseType = distributed.ProcessorOuterClass.ProcessReply.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<distributed.ProcessorOuterClass.ProcessRequest,
      distributed.ProcessorOuterClass.ProcessReply> getProcessMethod() {
    io.grpc.MethodDescriptor<distributed.ProcessorOuterClass.ProcessRequest, distributed.ProcessorOuterClass.ProcessReply> getProcessMethod;
    if ((getProcessMethod = ProcessorGrpc.getProcessMethod) == null) {
      synchronized (ProcessorGrpc.class) {
        if ((getProcessMethod = ProcessorGrpc.getProcessMethod) == null) {
          ProcessorGrpc.getProcessMethod = getProcessMethod =
              io.grpc.MethodDescriptor.<distributed.ProcessorOuterClass.ProcessRequest, distributed.ProcessorOuterClass.ProcessReply>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "Process"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  distributed.ProcessorOuterClass.ProcessRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  distributed.ProcessorOuterClass.ProcessReply.getDefaultInstance()))
              .setSchemaDescriptor(new ProcessorMethodDescriptorSupplier("Process"))
              .build();
        }
      }
    }
    return getProcessMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static ProcessorStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<ProcessorStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<ProcessorStub>() {
        @java.lang.Override
        public ProcessorStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new ProcessorStub(channel, callOptions);
        }
      };
    return ProcessorStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static ProcessorBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<ProcessorBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<ProcessorBlockingStub>() {
        @java.lang.Override
        public ProcessorBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new ProcessorBlockingStub(channel, callOptions);
        }
      };
    return ProcessorBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static ProcessorFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<ProcessorFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<ProcessorFutureStub>() {
        @java.lang.Override
        public ProcessorFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new ProcessorFutureStub(channel, callOptions);
        }
      };
    return ProcessorFutureStub.newStub(factory, channel);
  }

  /**
   */
  public interface AsyncService {

    /**
     */
    default void process(distributed.ProcessorOuterClass.ProcessRequest request,
        io.grpc.stub.StreamObserver<distributed.ProcessorOuterClass.ProcessReply> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getProcessMethod(), responseObserver);
    }
  }

  /**
   * Base class for the server implementation of the service Processor.
   */
  public static abstract class ProcessorImplBase
      implements io.grpc.BindableService, AsyncService {

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return ProcessorGrpc.bindService(this);
    }
  }

  /**
   * A stub to allow clients to do asynchronous rpc calls to service Processor.
   */
  public static final class ProcessorStub
      extends io.grpc.stub.AbstractAsyncStub<ProcessorStub> {
    private ProcessorStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected ProcessorStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new ProcessorStub(channel, callOptions);
    }

    /**
     */
    public void process(distributed.ProcessorOuterClass.ProcessRequest request,
        io.grpc.stub.StreamObserver<distributed.ProcessorOuterClass.ProcessReply> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getProcessMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * A stub to allow clients to do synchronous rpc calls to service Processor.
   */
  public static final class ProcessorBlockingStub
      extends io.grpc.stub.AbstractBlockingStub<ProcessorBlockingStub> {
    private ProcessorBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected ProcessorBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new ProcessorBlockingStub(channel, callOptions);
    }

    /**
     */
    public distributed.ProcessorOuterClass.ProcessReply process(distributed.ProcessorOuterClass.ProcessRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getProcessMethod(), getCallOptions(), request);
    }
  }

  /**
   * A stub to allow clients to do ListenableFuture-style rpc calls to service Processor.
   */
  public static final class ProcessorFutureStub
      extends io.grpc.stub.AbstractFutureStub<ProcessorFutureStub> {
    private ProcessorFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected ProcessorFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new ProcessorFutureStub(channel, callOptions);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<distributed.ProcessorOuterClass.ProcessReply> process(
        distributed.ProcessorOuterClass.ProcessRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getProcessMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_PROCESS = 0;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final AsyncService serviceImpl;
    private final int methodId;

    MethodHandlers(AsyncService serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_PROCESS:
          serviceImpl.process((distributed.ProcessorOuterClass.ProcessRequest) request,
              (io.grpc.stub.StreamObserver<distributed.ProcessorOuterClass.ProcessReply>) responseObserver);
          break;
        default:
          throw new AssertionError();
      }
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public io.grpc.stub.StreamObserver<Req> invoke(
        io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        default:
          throw new AssertionError();
      }
    }
  }

  public static final io.grpc.ServerServiceDefinition bindService(AsyncService service) {
    return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
        .addMethod(
          getProcessMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              distributed.ProcessorOuterClass.ProcessRequest,
              distributed.ProcessorOuterClass.ProcessReply>(
                service, METHODID_PROCESS)))
        .build();
  }

  private static abstract class ProcessorBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    ProcessorBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return distributed.ProcessorOuterClass.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("Processor");
    }
  }

  private static final class ProcessorFileDescriptorSupplier
      extends ProcessorBaseDescriptorSupplier {
    ProcessorFileDescriptorSupplier() {}
  }

  private static final class ProcessorMethodDescriptorSupplier
      extends ProcessorBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final java.lang.String methodName;

    ProcessorMethodDescriptorSupplier(java.lang.String methodName) {
      this.methodName = methodName;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.MethodDescriptor getMethodDescriptor() {
      return getServiceDescriptor().findMethodByName(methodName);
    }
  }

  private static volatile io.grpc.ServiceDescriptor serviceDescriptor;

  public static io.grpc.ServiceDescriptor getServiceDescriptor() {
    io.grpc.ServiceDescriptor result = serviceDescriptor;
    if (result == null) {
      synchronized (ProcessorGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new ProcessorFileDescriptorSupplier())
              .addMethod(getProcessMethod())
              .build();
        }
      }
    }
    return result;
  }
}
