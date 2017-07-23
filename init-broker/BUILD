load("@io_bazel_rules_go//go:def.bzl", "go_binary", "go_library")

go_library(
    name = "go_default_library",
    srcs = ["main.go"],
    visibility = ["//visibility:private"],
    deps = [
        "@com_github_golang_glog//:go_default_library",
        "@io_k8s_apimachinery//pkg/api/errors:go_default_library",
        "@io_k8s_apimachinery//pkg/apis/meta/v1:go_default_library",
        "@io_k8s_client-go//kubernetes:go_default_library",
        "@io_k8s_client-go//rest:go_default_library",
    ],
)

go_binary(
    name = "in-cluster-client-configuration",
    linkstamp = "main",
    library = ":go_default_library",
    visibility = ["//visibility:public"],
)
