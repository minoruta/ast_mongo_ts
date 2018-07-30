/**
 * Property definition for Endpoint
 */
import { AstProperties } from './common';
export interface EndpointProperties extends AstProperties {
    aors?: string;
    auth?: string;
    transport?: string;
    rpid_immediate?: boolean;
    webrtc?: string;
    device_state_busy_at?: number;
    t38_udptl_maxdatagram?: number;
    dtls_rekey?: number;
    direct_media_method?: string;
    send_rpid?: boolean;
    sdp_session?: string;
    dtls_verify?: string;
    record_on_feature?: string;
    dtls_fingerprint?: string;
    timers_sess_expires?: number;
    media_encryption_optimistic?: boolean;
    identify_by?: string;
    callerid_privacy?: string;
    mwi_subscribe_replaces_unsolicited?: boolean;
    cos_audio?: number;
    context?: string;
    rtp_symmetric?: boolean;
    moh_suggest?: string;
    t38_udptl?: boolean;
    fax_detect?: boolean;
    tos_video?: number;
    srtp_tag_32?: boolean;
    refer_blind_progress?: boolean;
    max_audio_streams?: number;
    bundle?: number;
    use_avpf?: boolean;
    fax_detect_timeout?: number;
    sdp_owner?: string;
    force_rport?: boolean;
    rtp_timeout_hold?: number;
    use_ptime?: boolean;
    rtp_timeout?: number;
    preferred_codec_only?: boolean;
    force_avp?: boolean;
    record_off_feature?: string;
    from_user?: string;
    send_diversion?: boolean;
    t38_udptl_ipv6?: boolean;
    allow_subscribe?: boolean;
    rtp_ipv6?: boolean;
    callerid?: string;
    moh_passthrough?: boolean;
    cos_video?: number;
    asymmetric_rtp_codec?: boolean;
    ice_support?: boolean;
    aggregate_mwi?: boolean;
    one_touch_recording?: boolean;
    allow?: string;
    rewrite_contact?: boolean;
    user_eq_phone?: boolean;
    rtp_engine?: string;
    notify_early_inuse_ringing?: boolean;
    direct_media_glare_mitigation?: string;
    trust_id_inbound?: boolean;
    bind_rtp_to_media_address?: boolean;
    disable_direct_media_on_nat?: boolean;
    media_encryption?: string;
    media_use_received_transport?: boolean;
    allow_overlap?: boolean;
    dtmf_mode?: string;
    tos_audio?: number;
    dtls_setup?: string;
    connected_line_method?: string;
    g726_non_standard?: boolean;
    '100rel'?: string;
    timers?: string;
    direct_media?: boolean;
    timers_min_se?: number;
    trust_id_outbound?: boolean;
    sub_min_expiry?: number;
    rtcp_mux?: number;
    max_video_streams?: number;
    send_pai?: boolean;
    rtp_keepalive?: number;
    t38_udptl_ec?: number;
    t38_udptl_nat?: boolean;
    allow_transfer?: boolean;
    inband_progress?: boolean;
}
