declare global {
    interface Window {
        TrelloPowerUp: {
            initialize: (handlers: PowerUpHandlers, config: TrelloPowerUpConfig) => void;
            iframe: (options: { appKey: string; appName: string }) => PowerUp.IFrame;
        }
    }
}

export interface TrelloPowerUpConfig {
    appKey: string;
    appName: string;
}

export interface TrelloPowerUp {
    initialize: (handlers: PowerUpHandlers, config: TrelloPowerUpConfig) => void;
    iframe: (options: { appKey: string; appName: string }) => PowerUp.IFrame;
}

export interface PowerUpHandlers {
    'board-buttons'?: BoardButtonCallback;
    'card-badges'?: CardBadgesCallback;
    'card-buttons'?: CardButtonCallback;
    'card-back-section'?: CardBackSectionCallback;
    'card-from-url'?: CardFromUrlCallback;
    'format-url'?: FormatUrlCallback;
    'show-settings'?: ShowSettingsCallback;
    'authorization-status'?: AuthorizationStatusCallback;
    'on-enable'?: EnableCallback;
    'on-disable'?: DisableCallback;
    'attachment-sections'?: AttachmentSectionsCallback;
    'card-detail-badges'?: CardDetailBadgesCallback;
    'list-actions'?: ListActionsCallback;
    'list-sorters'?: ListSortersCallback;
    'remove-data'?: RemoveDataCallback;
}

export type BoardButtonCallback = (t: PowerUp.IFrame) => BoardButton[] | Promise<BoardButton[]>;
export type CardBadgesCallback = (t: PowerUp.IFrame) => Badge[] | Promise<Badge[]>;
export type CardButtonCallback = (t: PowerUp.IFrame) => CardButton[] | Promise<CardButton[]>;
export type CardBackSectionCallback = (t: PowerUp.IFrame) => CardBackSection | Promise<CardBackSection>;
export type CardFromUrlCallback = (t: PowerUp.IFrame) => Promise<CardFromUrlResponse>;
export type FormatUrlCallback = (t: PowerUp.IFrame) => Promise<FormatUrlResponse>;
export type ShowSettingsCallback = (t: PowerUp.IFrame) => Promise<void>;
export type AuthorizationStatusCallback = (t: PowerUp.IFrame) => Promise<AuthorizationStatus>;
export type EnableCallback = (t: PowerUp.IFrame) => Promise<void>;
export type DisableCallback = (t: PowerUp.IFrame) => Promise<void>;
export type AttachmentSectionsCallback = (t: PowerUp.IFrame) => Promise<AttachmentSection[]>;
export type CardDetailBadgesCallback = (t: PowerUp.IFrame) => Promise<Badge[]>;
export type ListActionsCallback = (t: PowerUp.IFrame) => ListAction[] | Promise<ListAction[]>;
export type ListSortersCallback = (t: PowerUp.IFrame) => ListSorter[] | Promise<ListSorter[]>;
export type RemoveDataCallback = (t: PowerUp.IFrame) => Promise<void>;

export interface BoardButton {
    icon: {
        dark: string;
        light: string;
    } | string;
    text: string;
    condition?: 'always' | 'edit' | 'signedIn' | 'signedOut';
    callback: (t: PowerUp.IFrame) => Promise<void>;
}

export interface Badge {
    text?: string;
    icon?: string;
    color?: 'blue' | 'green' | 'orange' | 'red' | 'yellow' | 'purple' | 'pink' | 'black' | 'sky' | 'lime';
    callback?: (t: PowerUp.IFrame) => Promise<void>;
    href?: string;
    target?: string;
}

export interface CardButton {
    icon: string;
    text: string;
    condition?: 'always' | 'edit' | 'signedIn' | 'signedOut';
    callback: (t: PowerUp.IFrame) => Promise<void>;
    target?: string;
}

export interface CardBackSection {
    title: string;
    icon: string;
    content: {
        type: 'iframe' | 'callback';
        url?: string;
        height?: number;
        callback?: (t: PowerUp.IFrame) => Promise<void>;
    };
}

export interface CardFromUrlResponse {
    name: string;
    desc?: string;
}

export interface FormatUrlResponse {
    icon: string;
    text: string;
    subtext?: string;
    image?: {
        url: string;
        size: 'contain' | 'original' | 'cover';
    };
    actions?: CardButton[];
    thumbnail?: string;
}

export interface AuthorizationStatus {
    authorized: boolean;
}

export interface AttachmentSection {
    claimed: boolean;
    icon: string;
    content: {
        type: string;
        url?: string;
        height?: number;
    };
}

export interface ListAction {
    text: string;
    callback: (t: PowerUp.IFrame) => Promise<void>;
}

export interface ListSorter {
    text: string;
    callback: (t: PowerUp.IFrame, options: any) => Promise<void>;
}

export interface PopupOptions {
    title: string;
    url?: string;
    height?: number;
    args?: any;
    callback?: (t: PowerUp.IFrame) => void;
    items?: PopupItem[];
    search?: {
        count?: number;
        placeholder?: string;
        empty?: string;
        searching?: string;
        debounce?: number;
    };
}

export interface PopupItem {
    text: string;
    callback: (t: PowerUp.IFrame) => void;
}

export interface CardProperties {
    id: string;
    name: string;
    desc: string;
    closed: boolean;
    idBoard: string;
    idList: string;
    idShort: number;
    idAttachmentCover: string;
    idMembers: string[];
    idLabels: string[];
    url: string;
    shortUrl: string;
    pos: number;
    due: string | null;
    dueComplete: boolean;
    subscribed: boolean;
    cover: {
        color?: string;
        brightness?: 'dark' | 'light';
        size?: 'normal' | 'full';
        idAttachment?: string;
        idUploadedBackground?: string;
    };
    dateLastActivity: string;
    labels: Label[];
    badges: {
        attachments: number;
        checkItems: number;
        checkItemsChecked: number;
        comments: number;
        description: boolean;
        due: string | null;
        dueComplete: boolean;
        subscribed: boolean;
        viewingMemberVoted: boolean;
        votes: number;
    };
    customFieldItems: CustomFieldItem[];
}

export interface ListProperties {
    id: string;
    name: string;
    closed: boolean;
    idBoard: string;
    pos: number;
    subscribed: boolean;
    softLimit?: number;
    cards?: CardProperties[];  // Only included with nested fetches
}

export interface MemberProperties {
    id: string;
    fullName: string;
    username: string;
    initials: string;
    avatar: string | null;
    avatarHash: string | null;
    email: string | null;
    activityBlocked: boolean;
    idBoards: string[];
    idOrganizations: string[];
    loginTypes: string[];
    oneTimeMessagesDismissed: string[];
    prefs: {
        colorBlind: boolean;
        locale: string;
        minutesBetweenSummaries: number;
    };
    status: string;
    url: string;
    bio: string;
    confirmed: boolean;
    memberType: 'normal' | 'admin' | 'observer';
}

export interface BoardProperties {
    id: string;
    name: string;
    desc: string;
    closed: boolean;
    idOrganization: string;
    pinned: boolean;
    url: string;
    shortUrl: string;
    prefs: {
        permissionLevel: 'private' | 'org' | 'public';
        voting: 'disabled' | 'members' | 'observers' | 'org' | 'public';
        comments: 'disabled' | 'members' | 'observers' | 'org' | 'public';
        invitations: 'members' | 'admins';
        selfJoin: boolean;
        cardCovers: boolean;
        background: string;
        backgroundColor: string | null;
        backgroundImage: string | null;
        backgroundTile: boolean;
        calendarFeedEnabled: boolean;
        hideVotes: boolean;
        switcherViews: SwitcherView[];
    };
    labelNames: {
        green: string;
        yellow: string;
        orange: string;
        red: string;
        purple: string;
        blue: string;
    };
    lists?: ListProperties[];  // Only included with nested fetches
    members?: MemberProperties[];  // Only included with nested fetches
}

// Supporting interfaces
export interface Label {
    id: string;
    idBoard: string;
    name: string;
    color: string;
}

export interface CustomFieldItem {
    id: string;
    value: {
        text?: string;
        checked?: string;
        number?: string;
        date?: string;
    };
    idCustomField: string;
    idModel: string;
    modelType: 'card' | 'board';
}

export interface SwitcherView {
    viewType: string;
    enabled: boolean;
    _id: string;
}

export namespace PowerUp {
    export interface IFrame {
        arg<T = any>(name: string): T;
        get<T = any>(
            scope: Scope | string,
            visibility: Visibility | string,
            key?: string,
            defaultValue?: T
        ): Promise<T>;
        set(scope: Scope | string, visibility: Visibility | string, key: string, value: any): Promise<void>;
        remove(scope: Scope | string, visibility: Visibility | string, key: string): Promise<void>;
        popup(options: PopupOptions): Promise<void>;
        closePopup(): void;
        sizeTo(elementOrSelector: string | HTMLElement): void;
        card<T extends CardProperties = CardProperties>(fields: string | string[]): Promise<T>;
        list<T extends ListProperties = ListProperties>(fields: string | string[]): Promise<T>;
        member<T extends MemberProperties = MemberProperties>(fields: string | string[]): Promise<T>;
        board<T extends BoardProperties = BoardProperties>(fields: string | string[]): Promise<T>;

        getRestApi: () => Promise<Rest.Api>;
        authorize: (options: AuthorizationOptions) => Promise<string>;
        jwt: () => Promise<string>;
    }

    export namespace Rest {
        export interface Api {
            get: <T = any>(path: string, params?: object) => Promise<T>;
            post: <T = any>(path: string, data?: object) => Promise<T>;
            update: <T = any>(path: string, data?: object) => Promise<T>;
            delete: <T = any>(path: string) => Promise<T>;
            authorize: (opts: AuthorizationOptions) => Promise<string>;
            isAuthorized: () => boolean;
            clearToken: () => void;
        }
    }

    // Add the authorization options interface:
    export interface AuthorizationOptions {
        type?: 'redirect';
        name?: string;
        persist?: boolean;
        interactive?: boolean;
        scope?: {
            read?: boolean;
            write?: boolean;
            account?: boolean;
        };
        expiration?: 'never' | '1hour' | '1day' | '30days';
    }

    export type Scope = 'board' | 'card' | 'member' | 'organization';
    export type Visibility = 'shared' | 'private';
}