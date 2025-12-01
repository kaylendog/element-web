/*
Copyright 2024 New Vector Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { Button } from "@vector-im/compound-web";
import { Banner } from "@element-hq/web-shared-components";
import { type Room, type RoomMember } from "matrix-js-sdk/src/matrix";
import React from "react";

import { _t } from "../../../../languageHandler";
import {
    useUserIdentityWarningViewModel,
    type ViolationPrompt,
} from "../../../viewmodels/rooms/banners/UserIdentityWarningViewModel.tsx";
import MemberAvatar from "../../avatars/MemberAvatar";
import { type ButtonEvent } from "../../elements/AccessibleButton.tsx";

interface UserIdentityWarningProps {
    /**
     * The current room being viewed.
     */
    room: Room;
    /**
     * The ID of the room being viewed.  This is used to ensure that the
     * component's state and references are cleared when the room changes.
     */
    key: string;
}

/**
 * Displays a banner warning when there is an issue with a user's identity.
 *
 * Warns when an unverified user's identity was reset, and gives the user a
 * button to acknowledge the change.
 */
export const UserIdentityWarning: React.FC<UserIdentityWarningProps> = ({ room }) => {
    const { currentPrompt, dispatchAction } = useUserIdentityWarningViewModel(room, room.roomId);

    if (!currentPrompt) return null;

    const [title, action] = getTitleAndAction(currentPrompt);

    const onButtonClick = (ev: ButtonEvent): void => {
        ev.preventDefault();
        if (currentPrompt.type === "VerificationViolation") {
            dispatchAction({ type: "WithdrawVerification", userId: currentPrompt.member.userId });
        } else {
            dispatchAction({ type: "PinUserIdentity", userId: currentPrompt.member.userId });
        }
    };

    return (
        <Banner
            type={currentPrompt.type === "VerificationViolation" ? "critical" : "info"}
            avatar={memberAvatar(currentPrompt.member)}
            actions={
                <Button kind="secondary" size="sm" onClick={onButtonClick}>
                    {action}
                </Button>
            }
        >
            {title}
        </Banner>
    );
};

function getTitleAndAction(prompt: ViolationPrompt): [title: React.ReactNode, action: string] {
    let title: React.ReactNode;
    let action: string;
    if (prompt.type === "VerificationViolation") {
        if (prompt.member.rawDisplayName === prompt.member.userId) {
            title = _t(
                "encryption|verified_identity_changed_no_displayname",
                { userId: prompt.member.userId },
                {
                    a: substituteATag,
                    b: substituteBTag,
                },
            );
        } else {
            title = _t(
                "encryption|verified_identity_changed",
                { displayName: prompt.member.rawDisplayName, userId: prompt.member.userId },
                {
                    a: substituteATag,
                    b: substituteBTag,
                },
            );
        }
        action = _t("encryption|withdraw_verification_action");
    } else {
        if (prompt.member.rawDisplayName === prompt.member.userId) {
            title = _t(
                "encryption|pinned_identity_changed_no_displayname",
                { userId: prompt.member.userId },
                {
                    a: substituteATag,
                    b: substituteBTag,
                },
            );
        } else {
            title = _t(
                "encryption|pinned_identity_changed",
                { displayName: prompt.member.rawDisplayName, userId: prompt.member.userId },
                {
                    a: substituteATag,
                    b: substituteBTag,
                },
            );
        }
        action = _t("action|dismiss");
    }
    return [title, action];
}

function memberAvatar(member: RoomMember): React.ReactNode {
    return <MemberAvatar member={member} title={member.userId} size="30px" />;
}

function substituteATag(sub: string): React.ReactNode {
    return (
        <a href="https://element.io/help#encryption18" target="_blank" rel="noreferrer noopener">
            {sub}
        </a>
    );
}

function substituteBTag(sub: string): React.ReactNode {
    return <b>{sub}</b>;
}
