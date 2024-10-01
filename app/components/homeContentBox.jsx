/**
 * Renders the ContentBox component. * 
 * @returns {JSX.Element} The rendered ContentBox component.
 */
"use client";
import React, { useState } from 'react';

import TextChat from './chatBoxes/textChat';
import InfoBox from './introBoxes/homeBox';
import ChatButtons from './buttons/chatButtons';

export default function HomeContentBox() {
    return (
        <section id="about" className="wrapper about accelerate">
            <div className="cell accelerate">
                <div className="cables center accelerate">
                    <div className="panel accelerate">
                        <InfoBox />
                        <TextChat />
                        {/* <AiwithImage /> */}
                        {/* <ChatButtons /> */}
                    </div>
                </div>
            </div>
        </section>
    );
}