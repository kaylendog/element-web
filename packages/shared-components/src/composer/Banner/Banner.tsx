/*
 * Copyright (c) 2025 Element Creations Ltd.
 *
 * SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
 * Please see LICENSE files in the repository root for full details.
 */

import classNames from "classnames";
import React, { type MouseEventHandler, type ReactElement, type ReactNode, type PropsWithChildren } from "react";
import { Button } from "@vector-im/compound-web";

import styles from "./Banner.module.css";
import { _t } from "../../utils/i18n";

interface BannerProps {
    className?: string;
    /**
     * The type of the status banner.
     */
    type?: "success" | "info" | "critical";
    /**
     * Actions presented to the user in the right-hand side of the banner alongside the dismiss button.
     */
    actions?: ReactNode;
    /**
     * Called when the user presses the "dismiss" button.
     */
    onClose: MouseEventHandler<HTMLButtonElement>;
}

/**
 * A component to alert that history is shared to new members of the room.
 *
 * @example
 * ```tsx
 *   <StatusBar  onClose={onCloseHandler} />
 * ```
 */
export function Banner({
    type,
    children,
    className,
    actions,
    onClose,
    ...props
}: PropsWithChildren<BannerProps>): ReactElement {
    const classes = classNames(styles.banner, className);

    return (
        <div {...props} className={classes} data-type={type}>
            <div className={styles.content}>{children}</div>
            <div className={styles.actions}>
                {actions}
                <Button kind="secondary" size="sm" onClick={onClose}>
                    {_t("action|dismiss")}
                </Button>
            </div>
        </div>
    );
}
