# syntax=docker/dockerfile:1.7
# Official upstream source revisions; no third-party binary mirror.
FROM --platform=$BUILDPLATFORM golang:1.26.8-bookworm@sha256:a688600ca24f8a4d3ca77f95b0dd40704a9fc787c826660eb7ba0b641b8b175d AS server-build
ARG TARGETOS
ARG TARGETARCH
RUN --mount=type=cache,target=/go/pkg/mod --mount=type=cache,target=/root/.cache/go-build \
    CGO_ENABLED=0 GOTOOLCHAIN=local GOOS=$TARGETOS GOARCH=$TARGETARCH \
    go install github.com/minio/minio@9e49d5e7a648f00e26f2246f4dc28e6b07f8c84a \
    && mkdir -p /out \
    && if test -f /go/bin/minio; then cp /go/bin/minio /out/minio; \
       else cp /go/bin/${TARGETOS}_${TARGETARCH}/minio /out/minio; fi \
    && MINIO_SOURCE_DIR="$(go list -m -f '{{.Dir}}' github.com/minio/minio@9e49d5e7a648f00e26f2246f4dc28e6b07f8c84a)" \
    && mkdir -p /out/notices \
    && cp "$MINIO_SOURCE_DIR/LICENSE" "$MINIO_SOURCE_DIR/NOTICE" "$MINIO_SOURCE_DIR/CREDITS" /out/notices/ \
    && printf '%s\n' 'https://github.com/minio/minio/tree/9e49d5e7a648f00e26f2246f4dc28e6b07f8c84a' > /out/notices/SOURCE

FROM --platform=$BUILDPLATFORM golang:1.26.8-bookworm@sha256:a688600ca24f8a4d3ca77f95b0dd40704a9fc787c826660eb7ba0b641b8b175d AS client-build
ARG TARGETOS
ARG TARGETARCH
RUN --mount=type=cache,target=/go/pkg/mod --mount=type=cache,target=/root/.cache/go-build \
    CGO_ENABLED=0 GOTOOLCHAIN=local GOOS=$TARGETOS GOARCH=$TARGETARCH \
    go install github.com/minio/mc@7394ce0dd2a80935aded936b09fa12cbb3cb8096 \
    && mkdir -p /out \
    && if test -f /go/bin/mc; then cp /go/bin/mc /out/mc; \
       else cp /go/bin/${TARGETOS}_${TARGETARCH}/mc /out/mc; fi \
    && MINIO_CLIENT_SOURCE_DIR="$(go list -m -f '{{.Dir}}' github.com/minio/mc@7394ce0dd2a80935aded936b09fa12cbb3cb8096)" \
    && mkdir -p /out/notices \
    && cp "$MINIO_CLIENT_SOURCE_DIR/LICENSE" "$MINIO_CLIENT_SOURCE_DIR/NOTICE" "$MINIO_CLIENT_SOURCE_DIR/CREDITS" /out/notices/ \
    && printf '%s\n' 'https://github.com/minio/mc/tree/7394ce0dd2a80935aded936b09fa12cbb3cb8096' > /out/notices/SOURCE

FROM debian:trixie-slim@sha256:a99cfc517144bc59b1978475ec53b46ecabec7e43635402ee5b77cc54cd1b20a AS runtime
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates curl \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd --gid 10001 minio \
    && useradd --uid 10001 --gid 10001 --no-create-home --shell /usr/sbin/nologin minio
# ``mc`` stores its alias/config cache under $HOME; the runtime mount is
# read-only, so point it at the tmpfs both compose services mount.
ENV HOME=/tmp

FROM runtime AS server
LABEL org.opencontainers.image.source="https://github.com/minio/minio" \
      org.opencontainers.image.revision="9e49d5e7a648f00e26f2246f4dc28e6b07f8c84a" \
      org.opencontainers.image.version="RELEASE.2025-10-15T17-29-55Z-source"
COPY --from=server-build /out/minio /usr/local/bin/minio
COPY --from=server-build /out/notices/ /usr/share/doc/minio/
RUN mkdir /data && chown 10001:10001 /data
USER 10001:10001
EXPOSE 9000 9001
ENTRYPOINT ["minio"]
CMD ["server", "/data"]

FROM runtime AS client
LABEL org.opencontainers.image.source="https://github.com/minio/mc" \
      org.opencontainers.image.revision="7394ce0dd2a80935aded936b09fa12cbb3cb8096" \
      org.opencontainers.image.version="RELEASE.2025-08-13T08-35-41Z-source"
COPY --from=client-build /out/mc /usr/local/bin/mc
COPY --from=client-build /out/notices/ /usr/share/doc/mc/
USER 10001:10001
ENTRYPOINT ["mc"]
