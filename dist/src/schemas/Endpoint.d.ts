export declare const EndpointDefinition: {
    _id: StringConstructor;
    aors: StringConstructor;
    auth: {
        type: StringConstructor;
        ref: string;
    };
    transport: StringConstructor;
    rpid_immediate: BooleanConstructor;
    webrtc: StringConstructor;
    device_state_busy_at: {
        type: NumberConstructor;
        min: number;
        integer: boolean;
    };
    t38_udptl_maxdatagram: {
        type: NumberConstructor;
        min: number;
        integer: boolean;
    };
    dtls_rekey: {
        type: NumberConstructor;
        min: number;
        integer: boolean;
    };
    direct_media_method: StringConstructor;
    send_rpid: BooleanConstructor;
    sdp_session: StringConstructor;
    dtls_verify: StringConstructor;
    record_on_feature: StringConstructor;
    dtls_fingerprint: StringConstructor;
    timers_sess_expires: {
        type: NumberConstructor;
        min: number;
        integer: boolean;
    };
    media_encryption_optimistic: BooleanConstructor;
    identify_by: StringConstructor;
    callerid_privacy: StringConstructor;
    mwi_subscribe_replaces_unsolicited: BooleanConstructor;
    cos_audio: {
        type: NumberConstructor;
        min: number;
        integer: boolean;
    };
    context: StringConstructor;
    rtp_symmetric: BooleanConstructor;
    moh_suggest: StringConstructor;
    t38_udptl: BooleanConstructor;
    fax_detect: BooleanConstructor;
    tos_video: {
        type: NumberConstructor;
        min: number;
        integer: boolean;
    };
    srtp_tag_32: BooleanConstructor;
    refer_blind_progress: BooleanConstructor;
    max_audio_streams: {
        type: NumberConstructor;
        min: number;
        integer: boolean;
    };
    bundle: {
        type: NumberConstructor;
        min: number;
        integer: boolean;
    };
    use_avpf: BooleanConstructor;
    fax_detect_timeout: {
        type: NumberConstructor;
        min: number;
        integer: boolean;
    };
    sdp_owner: StringConstructor;
    force_rport: BooleanConstructor;
    rtp_timeout_hold: {
        type: NumberConstructor;
        min: number;
        integer: boolean;
    };
    use_ptime: BooleanConstructor;
    rtp_timeout: {
        type: NumberConstructor;
        min: number;
        integer: boolean;
    };
    preferred_codec_only: BooleanConstructor;
    force_avp: BooleanConstructor;
    record_off_feature: StringConstructor;
    from_user: StringConstructor;
    send_diversion: BooleanConstructor;
    t38_udptl_ipv6: BooleanConstructor;
    allow_subscribe: BooleanConstructor;
    rtp_ipv6: BooleanConstructor;
    callerid: StringConstructor;
    moh_passthrough: BooleanConstructor;
    cos_video: {
        type: NumberConstructor;
        min: number;
        integer: boolean;
    };
    asymmetric_rtp_codec: BooleanConstructor;
    ice_support: BooleanConstructor;
    aggregate_mwi: BooleanConstructor;
    one_touch_recording: BooleanConstructor;
    allow: StringConstructor;
    rewrite_contact: BooleanConstructor;
    user_eq_phone: BooleanConstructor;
    rtp_engine: StringConstructor;
    notify_early_inuse_ringing: BooleanConstructor;
    direct_media_glare_mitigation: StringConstructor;
    trust_id_inbound: BooleanConstructor;
    bind_rtp_to_media_address: BooleanConstructor;
    disable_direct_media_on_nat: BooleanConstructor;
    media_encryption: StringConstructor;
    media_use_received_transport: BooleanConstructor;
    allow_overlap: BooleanConstructor;
    dtmf_mode: StringConstructor;
    tos_audio: {
        type: NumberConstructor;
        min: number;
        integer: boolean;
    };
    dtls_setup: StringConstructor;
    connected_line_method: StringConstructor;
    g726_non_standard: BooleanConstructor;
    "100rel": StringConstructor;
    timers: StringConstructor;
    direct_media: BooleanConstructor;
    timers_min_se: {
        type: NumberConstructor;
        min: number;
        integer: boolean;
    };
    trust_id_outbound: BooleanConstructor;
    sub_min_expiry: {
        type: NumberConstructor;
        min: number;
        integer: boolean;
    };
    rtcp_mux: {
        type: NumberConstructor;
        min: number;
        integer: boolean;
    };
    max_video_streams: {
        type: NumberConstructor;
        min: number;
        integer: boolean;
    };
    send_pai: BooleanConstructor;
    rtp_keepalive: {
        type: NumberConstructor;
        min: number;
        integer: boolean;
    };
    t38_udptl_ec: {
        type: NumberConstructor;
        min: number;
        integer: boolean;
    };
    t38_udptl_nat: BooleanConstructor;
    allow_transfer: BooleanConstructor;
    inband_progress: BooleanConstructor;
};
