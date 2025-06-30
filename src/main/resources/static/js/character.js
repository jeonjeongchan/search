$(function () {
    characterInit();
    tooltipInit();

});

function characterInit() {

    let characterAllData = characterAll;
    if (characterAllData != null && characterAllData !== "null") {

        let characterAllParsing = JSON.parse(characterAllData);
        let siblingsParsing = JSON.parse(siblings);

        console.log(characterAllParsing);
        console.log(siblingsParsing);

        // 전체 화면
        let $character = $('.character');
        $character.append(`

            <div class="character-info">
                <div class="character-section-1">
                    <div class="character-name">
                        <h3>${characterAllParsing.ArmoryProfile.CharacterName}</h3>
                    </div>
                    <div class="character-profile"></div>    
                </div>
                <div class="character-section-2"></div>
            </div>
        `);

        // 프로필
        let $characterProfile = $('.character-profile');
        $characterProfile.append(`
                   <div class="profile-field">
                      <img src="${characterAllParsing.ArmoryProfile.CharacterImage}" alt="캐릭터 이미지">  
                   </div>
                  <div class="profile-field">
                    <span class="label">아이템 레벨</span>
                    <span class="value">${characterAllParsing.ArmoryProfile.ItemAvgLevel}</span>
                  </div>
                  <div class="profile-field">
                    <span class="label">칭호</span>
                    <span class="value">${characterAllParsing.ArmoryProfile.Title}</span>
                  </div>
                  <div class="profile-field">
                    <span class="label">서버</span>
                    <span class="value">${characterAllParsing.ArmoryProfile.ServerName}</span>
                  </div>
                  <div class="profile-field">
                    <span class="label">클래스</span>
                    <span class="value">${characterAllParsing.ArmoryProfile.CharacterClassName}</span>
                  </div>
                  <div class="profile-field">
                    <span class="label">전투레벨</span>
                    <span class="value">${characterAllParsing.ArmoryProfile.CombatPower}</span>
                  </div>
                  <div class="profile-field">
                    <span class="label">길드이름</span>
                    <span class="value">${characterAllParsing.ArmoryProfile.GuildName}</span>
                  </div>
                  <div class="profile-field">
                    <span class="label">원정대 레벨</span>
                    <span class="value">${characterAllParsing.ArmoryProfile.ExpeditionLevel}</span>
                  </div>
                  <div class="profile-field">
                    <span class="label">영지 이름</span>
                    <span class="value">${characterAllParsing.ArmoryProfile.TownName}</span>
                  </div>
                  <div class="profile-field">
                    <span class="label">영지 레벨</span>
                    <span class="value">${characterAllParsing.ArmoryProfile.TownLevel}</span>
                  </div>


                `);

        let $section2 = $('.character-section-2');
        $section2.append(`
                <div class="character-menu">
                    <button data-type="ability">능력치</button>
                    <button data-type="sibling">원정대</button>
                    <button data-type="skill">스킬</button>
                    <button data-type="guild">길드</button>
                    <button data-type="collection">수집</button>
                    <button data-type="avatar">아바타</button>
                </div>
                <div class="character-content"></div>
    
        `);


        $('.character-menu button').on('click', function () {
            const type = $(this).data('type');
            const $content = $('.character-content');
            $content.empty();

            // 능력치 버튼
            if (type === "ability") {
                $content.append(`
                    <div class="armoryEquipment"></div>
                    <div class="stats"></div>
                    <div class="Tendencies"></div>
                    <div class="engravings"></div>
                    <div class="avatars"></div>
                    <div class="gems"></div>
                    <div class="cards" style="display:flex;"></div>
                    <div class="cards-set-list"></div>
                    <div class="arkPassives" ></div>    
                    <div class="custom-tooltip" style="display: none; position: absolute;"></div> 
                `);

                characterAllParsing.ArmoryEquipment.forEach(equipment => {

                    const $tooltipDiv = $('<div class="item-tooltip-trigger"></div>')
                        .data('tooltip', JSON.parse(equipment.Tooltip));

                    // 이 안에 콘텐츠를 넣음
                    $tooltipDiv.append(`<img src="${equipment.Icon}" alt="">`);
                    $tooltipDiv.append(`<p>${equipment.Name}</p>`);

                    $('.armoryEquipment').append($tooltipDiv);
                });

                // 스탯
                characterAllParsing.ArmoryProfile.Stats.forEach(stat => {
                    $('.stats').append(`
                        <div style="display:flex">
                            <p>${stat.Type}</p>
                            <p>${stat.Value}</p>
                        </div>   
                    `);
                });

                // 성향
                characterAllParsing.ArmoryProfile.Tendencies.forEach(stat => {
                    $('.Tendencies').append(`
                        <div style="display:flex">
                            <p>${stat.Type}</p>
                            <p>${stat.Point}</p>
                        </div>   
                    `);
                });

                characterAllParsing.ArmoryEngraving.ArkPassiveEffects.forEach(engraving => {
                    $('.engravings').append(`
                        <div style="display:flex">
                            <p>${engraving.Grade}</p>
                            <p>${engraving.Level}</p>
                            <p>${engraving.Name}</p>
                        </div>   
                    `);
                });

                let $gems = $('.gems');

                $gems.append(`
                    <div class="gemTotal">
                        <p>${characterAllParsing.ArmoryGem.Effects.Description}</p>
                    </div>
                    <div class="gemList" style="display:flex"></div>   
                `);


                if (characterAllParsing.ArmoryGem.Gems != null) {
                    characterAllParsing.ArmoryGem.Gems.forEach(gem => {
                        $('.gemList').append(`
                        <div>
                            <img src="${gem.Icon}" alt=""/>
                            <p>${gem.Level}</p>  
                        </div>   
                    `);
                    });
                } else {
                    $('.gemList').append(`
                        <div>
                            <p>보석이 없습니다.</p>
                        </div>   
                    `);
                }


                if (characterAllParsing.ArkPassive.IsArkPassive) {
                    $('.arkPassives').append(`
                        <p>아크패시브 활성화</p>  
                    `);
                } else {
                    $('.arkPassives').append(`
                        <p>아크패시브 비활성화</p>  
                    `);
                }

                characterAllParsing.ArkPassive.Points.forEach(effect => {
                    $('.arkPassives').append(`
                        <div style="display:flex">
                            <p>${effect.Name}</p>
                            <p>${effect.Value}</p>
                        </div>   
                        `);
                });

                characterAllParsing.ArkPassive.Effects.forEach(effect => {
                    $('.arkPassives').append(`
                        <div style="display:flex">
                            <img src="${effect.Icon}" alt="">
                            <p>${effect.Description}</p>
                        </div>   
                    `);

                });

                characterAllParsing.ArmoryCard.Cards.forEach(card => {
                    $('.cards').append(`
                        <div class="card">
                            <img src="${card.Icon}" alt="">
                            <p>${card.Name}</p>
                        </div>   
                    `);

                });

                if (characterAllParsing.ArmoryCard.Effects !== null) {
                    characterAllParsing.ArmoryCard.Effects[0].Items.forEach(cardSet => {
                        $('.cards-set-list').append(`
                            <div class="card-set">
                                <p class="card-set-value">${cardSet.Name}</p>
                                <p class="card-set-value">${cardSet.Description}</p>
                            </div>
    
                        `);
                    });
                }

            } else if (type === "skill") {
                $content.append(`
                    <div class="skill-point"></div>
                    <div class="skill-list"></div>
                `);

                $('.skill-point').append(`
                    <p>스킬 포인트 : ${characterAllParsing.ArmoryProfile.UsingSkillPoint} / ${characterAllParsing.ArmoryProfile.TotalSkillPoint}</p>
                `);

                characterAllParsing.ArmorySkills.forEach(skill => {

                    // 스킬 트포 여부
                    let tripodUse = skill.Tripods.some(tripod => tripod.IsSelected);

                    // 스킬 사용 여부 확인 (트포 & 룬 사용으로 확인)
                    if (tripodUse === true || skill.Rune !== null) {
                        let runeHtml = '';
                        if (skill.Rune !== null) {
                            runeHtml = `
                            <div class="skill-info-2">                            
                                <img src="${skill.Rune.Icon}" alt="">
                                <p>${skill.Rune.Grade}</p>
                                <p>${skill.Rune.Name}</p>
                            </div>
                        `;
                        }

                        $('.skill-list').append(`
                        <div class="skill-item">
                            <div class="skill-info-1">
                                <img src="${skill.Icon}" alt="">
                                <p>${skill.Name}</p>
                                <p>${skill.Level}</p>
                                </div>
                                ${runeHtml}
                            </div>
                        `);
                    }


                });

            } else if (type === "sibling") {

                $content.append(`
                  <div class="siblings-cards"></div>
                `);

                siblingsParsing.sort((a, b) => {
                    const levelA = parseInt(a.ItemAvgLevel.replace(/[^0-9]/g, ''), 10);
                    const levelB = parseInt(b.ItemAvgLevel.replace(/[^0-9]/g, ''), 10);
                    return levelB - levelA; // 내림차순
                });

                siblingsParsing.forEach(sibling => {
                    $('.siblings-cards').append(`
                        <div class="siblings-card">
                            <div class="siblings-card-row"><span class="label">서버:</span> <span class="value">${sibling.ServerName}</span></div>
                            <div class="siblings-card-row"><span class="label">이름:</span> <span class="value">${sibling.CharacterName}</span></div>
                            <div class="siblings-card-row"><span class="label">아이템레벨:</span> <span class="value">${sibling.ItemAvgLevel}</span></div>
                            <div class="siblings-card-row"><span class="label">클래스:</span> <span class="value">${sibling.CharacterClassName}</span></div>
                            <div class="siblings-card-row"><span class="label">전투레벨:</span> <span class="value">${sibling.CharacterLevel}</span></div>
                        </div>
                    `);
                });

            } else if (type === "collection") {
                // 수집형 포인트
                $content.append(`
                    <div class="collectibles"></div>
                `);

                let $collectibles = $('.collectibles');
                characterAllParsing.Collectibles.forEach(collectible => {
                    $collectibles.append(`
                        <div class="collectible-item">
                            <img src="${collectible.Icon}" alt="수집 아이콘">
                            <p class="collectible-point">${collectible.Point}</p>
                        </div>

                    `);
                });

            } else if (type === "avatar") {
                $content.append(`
                    <div class="avatar-list"></div>
                `);

                let $avatarList = $('.avatar-list');
                characterAllParsing.ArmoryAvatars.forEach(avatar => {
                    $avatarList.append(`
                        <div class="avatar-item">
                            <img src="${avatar.Icon}" alt="아바타 아이콘">
                            <p class="avatar-type">${avatar.Type}</p>
                            <p class="avatar-name">${avatar.Name}</p>
                        </div>

                    `);
                });
            }
        });
        // 능력치 보이게 초기화
        $('.character-menu button[data-type="ability"]').trigger("click");
    } else {
        let $character = $('.character');
        $character.append(`
            <p>캐릭터 정보가 없습니다.</p>    
        `)
    }
}

function buildTooltipHTML(data) {
    let html = '';

    for (const key in data) {
        const element = data[key];
        if (!element) continue;

        const type = element.type;
        const value = element.value;

        // 아이콘 출력: ItemTitle 안 slotData.iconPath 있으면 이미지 출력
        if (type === 'ItemTitle' && value?.slotData?.iconPath) {
            html += `<div class="tooltip-icon" style="margin-bottom:6px;">
                 <img src="${value.slotData.iconPath}" alt="icon" style="width:32px; height:32px;">
               </div>`;
        }

        if (typeof value === 'string') {
            // 문자열 값은 그대로 HTML로 출력
            html += `<div class="tooltip-text">${value}</div>`;
        } else if (typeof value === 'object' && value !== null) {
            // 객체인 경우, 타입별로 다르게 처리

            if (type === 'ItemPartBox') {
                // ItemPartBox 안의 각 Element_*를 출력
                for (const subKey in value) {
                    const subVal = value[subKey];
                    if (typeof subVal === 'string') {
                        html += `<div class="tooltip-text">${subVal}</div>`;
                    }
                }
            } else if (type === 'IndentStringGroup') {
                // IndentStringGroup 내부에 Element_* 가 또 있고, 그 안에 contentStr 객체가 있음
                if (value.topStr) {
                    html += `<div class="tooltip-topStr">${value.topStr}</div>`;
                }

                for (const subKey in value) {
                    if (subKey === 'topStr') continue;
                    const subGroup = value[subKey];
                    if (!subGroup || !subGroup.contentStr) continue;

                    const contentStrObj = subGroup.contentStr;

                    // contentStr 내부 Element_* 출력
                    for (const innerKey in contentStrObj) {
                        const innerVal = contentStrObj[innerKey];
                        if (typeof innerVal === 'string') {
                            html += `<div class="tooltip-text">${innerVal}</div>`;
                        } else if (innerVal?.contentStr && typeof innerVal.contentStr === 'string') {
                            html += `<div class="tooltip-text">${innerVal.contentStr}</div>`;
                        }
                    }
                }
            } else if (type === 'Progress') {
                // Progress 타입 value는 객체인데 재련 경험치 등 설명용이므로 title 같은거만 출력
                if (value.title) {
                    html += `<div class="tooltip-progress-title">${value.title}</div>`;
                }
            } else {
                // 일반 객체 속성 중 문자열 출력
                for (const subKey in value) {
                    const subVal = value[subKey];
                    if (typeof subVal === 'string') {
                        html += `<div class="tooltip-text">${subVal}</div>`;
                    }
                }
            }
        }
    }

    return html;
}

function tooltipInit() {

    $(document).on('mouseenter', '.item-tooltip-trigger', function (e) {
        const tooltipData = $(this).data('tooltip');
        if (!tooltipData) {
            console.log('tooltipData 없음');
            return;
        }

        const html = buildTooltipHTML(tooltipData);
        $('.custom-tooltip')
            .html(html)
            .css({
                top: e.pageY + 10 + 'px',
                left: e.pageX + 10 + 'px',
                display: 'block'
            });
    });

    $(document).on('mousemove', '.item-tooltip-trigger', function (e) {
        $('.custom-tooltip').css({
            top: e.pageY + 10 + 'px',
            left: e.pageX + 10 + 'px'
        });
    });

    $(document).on('mouseleave', '.item-tooltip-trigger', function () {
        $('.custom-tooltip').hide();
    });

}