$(function () {
    characterInit();
    tooltipInit();

});

function characterInit() {

    let characterAllData = characterAll;
    if (characterAllData != null && characterAllData !== "null") {

        let characterAllParsing = JSON.parse(characterAllData);
        let siblingsParsing = JSON.parse(siblings);
        //let guildMemberParsing = JSON.parse(guildMember);

        console.log(characterAllParsing);
        console.log(siblingsParsing);
        //console.log(guildMemberParsing);

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
        // $characterProfile.append(`
        //            <div class="profile-field">
        //               <img src="${characterAllParsing.ArmoryProfile.CharacterImage}" alt="캐릭터 이미지">
        //            </div>
        //           <div class="profile-field">
        //             <span class="label">아이템 레벨</span>
        //             <span class="value">${characterAllParsing.ArmoryProfile.ItemAvgLevel}</span>
        //           </div>
        //           <div class="profile-field">
        //             <span class="label">칭호</span>
        //             <span class="value">${characterAllParsing.ArmoryProfile.Title}</span>
        //           </div>
        //           <div class="profile-field">
        //             <span class="label">서버</span>
        //             <span class="value">${characterAllParsing.ArmoryProfile.ServerName}</span>
        //           </div>
        //           <div class="profile-field">
        //             <span class="label">클래스</span>
        //             <span class="value">${characterAllParsing.ArmoryProfile.CharacterClassName}</span>
        //           </div>
        //           <div class="profile-field">
        //             <span class="label">전투레벨</span>
        //             <span class="value">${characterAllParsing.ArmoryProfile.CombatPower}</span>
        //           </div>
        //           <div class="profile-field">
        //             <span class="label">길드이름</span>
        //             <span class="value">${characterAllParsing.ArmoryProfile.GuildName}</span>
        //           </div>
        //           <div class="profile-field">
        //             <span class="label">원정대 레벨</span>
        //             <span class="value">${characterAllParsing.ArmoryProfile.ExpeditionLevel}</span>
        //           </div>
        //           <div class="profile-field">
        //             <span class="label">영지 이름</span>
        //             <span class="value">${characterAllParsing.ArmoryProfile.TownName}</span>
        //           </div>
        //           <div class="profile-field">
        //             <span class="label">영지 레벨</span>
        //             <span class="value">${characterAllParsing.ArmoryProfile.TownLevel}</span>
        //           </div>
        //
        //
        //         `);

        $characterProfile.append(`
                  <div class="profile-card column-layout">
                    <div class="profile-image">
                      <img src="${characterAllParsing.ArmoryProfile.CharacterImage}" alt="캐릭터 이미지">
                    </div>
                    <div class="profile-details">
                      <div class="profile-field"><span class="label">아이템 레벨</span><span class="value">${characterAllParsing.ArmoryProfile.ItemAvgLevel}</span></div>
                      <div class="profile-field"><span class="label">칭호</span><span class="value">${characterAllParsing.ArmoryProfile.Title ? characterAllParsing.ArmoryProfile.Title : '-'}</span></div>
                      <div class="profile-field"><span class="label">서버</span><span class="value">${characterAllParsing.ArmoryProfile.ServerName}</span></div>
                      <div class="profile-field"><span class="label">클래스</span><span class="value">${characterAllParsing.ArmoryProfile.CharacterClassName}</span></div>
                      <div class="profile-field"><span class="label">전투레벨</span><span class="value">${characterAllParsing.ArmoryProfile.CombatPower}</span></div>
                      <div class="profile-field"><span class="label">길드이름</span><span class="value">${characterAllParsing.ArmoryProfile.GuildName ? characterAllParsing.ArmoryProfile.GuildName : '-'}</span></div>
                      <div class="profile-field"><span class="label">원정대 레벨</span><span class="value">${characterAllParsing.ArmoryProfile.ExpeditionLevel}</span></div>
                      <div class="profile-field"><span class="label">영지 이름</span><span class="value">${characterAllParsing.ArmoryProfile.TownName}</span></div>
                      <div class="profile-field"><span class="label">영지 레벨</span><span class="value">${characterAllParsing.ArmoryProfile.TownLevel}</span></div>
                    </div>
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
                    <div class="armoryEquipment">
                        <div class="equipment-window">
                            <div class="equipment clothes">
                                <div class="equipment-row">
                                    <div class="equipment-slot hat">
                                        <div class="slot-label">머리</div>
                                        <div class="item-icon"></div>
                                    </div>
                                    <div class="equipment-info hat">
                                        <div class="info-title"></div>
                                        <div class="info-content"></div>
                                     </div>                                   
                                </div>
                                <div class="equipment-row">
                                    <div class="equipment-slot pauldron">
                                        <div class="slot-label">견갑</div>
                                        <div class="item-icon"></div>
                                    </div>
                                    <div class="equipment-info">
                                        <div class="info-title"></div>
                                        <div class="info-content"></div>
                                     </div>  
                                </div>
                                <div class="equipment-row">
                                    <div class="equipment-slot chest">
                                        <div class="slot-label">상의</div>
                                        <div class="item-icon"></div>
                                    </div>
                                     <div class="equipment-info">
                                        <div class="info-title"></div>
                                        <div class="info-content"></div>
                                     </div> 
                                </div>
                                <div class="equipment-row">
                                    <div class="equipment-slot pants">
                                        <div class="slot-label">하의</div>
                                        <div class="item-icon"></div>
                                    </div>
                                     <div class="equipment-info">
                                        <div class="info-title"></div>
                                        <div class="info-content"></div>
                                     </div> 
                                </div>
                                <div class="equipment-row">
                                    <div class="equipment-slot gloves">
                                        <div class="slot-label">장갑</div>
                                        <div class="item-icon"></div>
                                    </div>
                                     <div class="equipment-info">
                                        <div class="info-title"></div>
                                        <div class="info-content"></div>
                                     </div> 
                                </div>
                                <div class="equipment-row">
                                    <div class="equipment-slot weapon">
                                        <div class="slot-label">무기</div>
                                        <div class="item-icon"></div>
                                    </div>
                                     <div class="equipment-info">
                                        <div class="info-title"></div>
                                        <div class="info-content"></div>
                                     </div> 
                                </div>
                            </div>
                            <div class="equipment accessories">                            
                                <div class="equipment-row">
                                    <div class="equipment-slot necklace">
                                        <div class="slot-label">목걸이</div>
                                        <div class="item-icon"></div>
                                    </div>
                                     <div class="equipment-info">
                                        <div class="info-title"></div>
                                        <div class="info-content"></div>
                                     </div> 
                                </div>
                                <div class="equipment-row">
                                    <div class="equipment-slot earring1">
                                        <div class="slot-label">귀걸이1</div>
                                        <div class="item-icon"></div>
                                    </div>
                                     <div class="equipment-info">
                                        <div class="info-title"></div>
                                        <div class="info-content"></div>
                                     </div> 
                                </div>
                                <div class="equipment-row">
                                    <div class="equipment-slot earring2">
                                        <div class="slot-label">귀걸이2</div>
                                        <div class="item-icon"></div>
                                    </div>
                                     <div class="equipment-info">
                                        <div class="info-title"></div>
                                        <div class="info-content"></div>
                                     </div> 
                                </div>
                                <div class="equipment-row">
                                    <div class="equipment-slot ring1">
                                        <div class="slot-label">반지1</div>
                                        <div class="item-icon"></div>
                                    </div>
                                     <div class="equipment-info">
                                        <div class="info-title"></div>
                                        <div class="info-content"></div>
                                     </div> 
                                </div>
                                <div class="equipment-row">
                                    <div class="equipment-slot ring2">
                                        <div class="slot-label">반지2</div>
                                        <div class="item-icon"></div>
                                    </div>
                                     <div class="equipment-info">
                                        <div class="info-title"></div>
                                        <div class="info-content"></div>
                                     </div> 
                                </div>
                                <div class="equipment-row">
                                    <div class="equipment-slot abilityStone">
                                        <div class="slot-label">스톤</div>
                                        <div class="item-icon"></div>
                                    </div>
                                     <div class="equipment-info">
                                        <div class="info-title"></div>
                                        <div class="info-content"></div>
                                     </div> 
                                </div>
                                <div class="equipment-row">
                                    <div class="equipment-slot bracelet">
                                        <div class="slot-label">팔찌</div>
                                        <div class="item-icon"></div>
                                    </div>
                                     <div class="equipment-info">
                                        <div class="info-title"></div>
                                        <div class="info-content"></div>
                                     </div> 
                                </div>
                            </div>
                            <div class="equipment special">
                                <div class="equipment-row">
                                    <div class="equipment-slot amulet">
                                        <div class="slot-label">부적</div>
                                        <div class="item-icon"></div>
                                    </div>
                                     <div class="equipment-info">
                                        <div class="info-title"></div>
                                        <div class="info-content"></div>
                                     </div> 
                                </div>
                                <div class="equipment-row">
                                    <div class="equipment-slot compass">
                                        <div class="slot-label">나침반</div>
                                        <div class="item-icon"></div>
                                    </div>
                                     <div class="equipment-info">
                                        <div class="info-title"></div>
                                        <div class="info-content"></div>
                                     </div> 
                                </div>
                                <div class="equipment-row">
                                    <div class="equipment-slot insignia">
                                        <div class="slot-label">문장</div>
                                        <div class="item-icon"></div>
                                    </div>
                                     <div class="equipment-info">
                                        <div class="info-title"></div>
                                        <div class="info-content"></div>
                                     </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex;  padding: 20px;">
                        <div class="stats" style="padding: 20px;"></div>
                        <div class="tendencies" style="padding: 20px;"></div>
                        <div class="engravings" style="padding: 20px;"></div>
                    </div>
                    <div class="avatars"></div>
                    <div class="gems"></div>
                    <div class="cards">
                        <div class="cards-container">
                            <div class="card-list"></div>
                            <div class="cards-set-list"></div>
                        </div>
                    </div>
                    
                    <div class="arkPassives" >
                        <div class="arkPassives-container">
                            <div class="arkPassives-points"></div>
                            <div class="arkPassives-contents"></div>
                        </div>
                    </div>    
                    <div class="custom-tooltip" style="display: none; position: absolute;"></div> 
                `);


                const typeLayoutMap = {
                    '투구': '.armoryEquipment .hat .item-icon',
                    '어깨': '.armoryEquipment .pauldron .item-icon',
                    '상의': '.armoryEquipment .chest .item-icon',
                    '하의': '.armoryEquipment .pants .item-icon',
                    '장갑': '.armoryEquipment .gloves .item-icon',
                    '무기': '.armoryEquipment .weapon .item-icon',
                    '목걸이': '.armoryEquipment .necklace .item-icon',
                    '귀걸이1': '.armoryEquipment .earring1 .item-icon',
                    '귀걸이2': '.armoryEquipment .earring2 .item-icon',
                    '반지1': '.armoryEquipment .ring1 .item-icon',
                    '반지2': '.armoryEquipment .ring2 .item-icon',
                    '어빌리티 스톤': '.armoryEquipment .abilityStone .item-icon',
                    '팔찌': '.armoryEquipment .bracelet .item-icon',
                    '나침반': '.armoryEquipment .compass .item-icon',
                    '부적': '.armoryEquipment .amulet .item-icon',
                    '문장': '.armoryEquipment .insignia .item-icon',
                };

                // 타입별 등장 횟수를 기록하기 위한 카운터
                const typeCounter = {};

                characterAllParsing.ArmoryEquipment.forEach((equipment) => {
                    let type = equipment.Type;

                    // 귀걸이, 반지처럼 여러 개 있을 수 있는 타입은 인덱스를 붙임
                    if (['귀걸이', '반지'].includes(type)) {
                        if (!typeCounter[type]) {
                            typeCounter[type] = 1;
                        } else {
                            typeCounter[type]++;
                        }
                        type = `${type}${typeCounter[type]}`; // 예: 귀걸이1, 귀걸이2
                    }

                    // const targetSelector = typeLayoutMap[type];
                    //
                    // if (!targetSelector) {
                    //     console.warn('Unknown or unmapped type:', type);
                    //     return;
                    // }
                    //
                    // const $tooltipDiv = $('<div class="item-tooltip-trigger"></div>')
                    //     .data('tooltip', JSON.parse(equipment.Tooltip))
                    //     .append(`<img src="${equipment.Icon}" alt="">`);
                    //
                    // const $target = $(targetSelector);
                    // $target.append($tooltipDiv);
                    const targetSelector = typeLayoutMap[type];

                    if (!targetSelector) {
                        console.warn('Unknown or unmapped type:', type);
                        return;
                    }

                    const $tooltipDiv = $('<div class="item-tooltip-trigger"></div>')
                        .data('tooltip', JSON.parse(equipment.Tooltip))
                        .append(`<img src="${equipment.Icon}" alt="">`);

                    const $target = $(targetSelector);
                    $target.append($tooltipDiv);

                    // 상세 정보 넣기
                    const $equipmentRow = $target.closest('.equipment-row');
                    $equipmentRow.find('.info-title').html(equipment.Name || '');
                    $equipmentRow.find('.info-content').html(equipment.Grade || '');
                })

                // 스탯
                let $stats = $('.stats');
                $stats.append(`                        
                        <div class="stats-container"></div>   
                `);

                let $statsContainer = $('.stats-container');

                characterAllParsing.ArmoryProfile.Stats.forEach(stat => {
                    $statsContainer.append(`
                      <div class="stat-box">
                        <span class="stat-name">${stat.Type}</span>
                        <span class="stat-value">${stat.Value}</span>
                      </div>
                    `);
                });

                // 성향
                let $tendencies = $('.tendencies');
                $tendencies.append(`                        
                        <div class="tendencies-container"></div>   
                `);

                let $tendenciesContainer = $('.tendencies-container');

                characterAllParsing.ArmoryProfile.Tendencies.forEach(tendencies => {
                    $tendenciesContainer.append(`
                          <div class="stat-box">
                            <span class="stat-name">${tendencies.Type}</span>
                            <span class="stat-value">${tendencies.Point}</span>
                          </div>
                    `);
                });

                // characterAllParsing.ArmoryEngraving.ArkPassiveEffects.forEach(engraving => {
                //     $('.engravings').append(`
                //         <div style="display:flex">
                //             <p>${engraving.Grade}</p>
                //             <p>${engraving.Level}</p>
                //             <p>${engraving.Name}</p>
                //         </div>
                //     `);
                // });
                $('.engravings').append(`<div class="engraving-cards-container"></div>`);
                const $container = $('.engraving-cards-container');

                characterAllParsing.ArmoryEngraving.ArkPassiveEffects.forEach(engraving => {
                    // $('.engravings').append(`
                    //     <div class="engraving-card">
                    //       <span class="engraving-grade grade-${engraving.Grade.toLowerCase()}">${engraving.Grade}</span>
                    //       <span class="engraving-name">${engraving.Name}</span>
                    //       <span class="engraving-level">${engraving.Level}</span>
                    //     </div>
                    //   `);
                    $container.append(`
                        <div class="engraving-card">
                          <span class="engraving-grade">${engraving.Grade}</span>
                          <span class="engraving-name">${engraving.Name}</span>
                          <span class="engraving-level">${engraving.Level}</span>
                        </div>
                      `);

                });

                let $gems = $('.gems');

                $gems.append(`
                    <div class="gems-container">
                        <div><p>${characterAllParsing.ArmoryGem.Effects.Description}</p></div>
                        <div class="gemList"></div>
                    </div>
                `);

                let $gemList = $('.gemList');

                for (let i = 0; i < 11; i++){
                    $gemList.append(`
                            <div class="gem-slot">
                                <div class="slot-label"></div>
                                <div class="item-icon"></div>    
                            </div>   
                        `);
                }

                let $gemSlotLabel = $('.gem-slot .slot-label');
                let $gemIcon = $('.gem-slot .item-icon');

                if (characterAllParsing.ArmoryGem.Gems != null) {
                    characterAllParsing.ArmoryGem.Gems.forEach((gem, index) => {
                        if (index < $gemSlotLabel.length) {
                            // 각 슬롯에 해당 보석 정보를 설정
                            $gemSlotLabel.eq(index).text(`Lv.${gem.Level}`);
                            $gemIcon.eq(index).html(`
                                <img src="${gem.Icon}" alt="보석 ${index + 1}" />
                            `);
                        }
                    });
                }

                let $arkPassivesContainer = $('.arkPassives-container');

                if (characterAllParsing.ArkPassive.IsArkPassive) {
                    $arkPassivesContainer.append(`
                        <p>아크패시브 활성화</p>  
                    `);
                } else {
                    $arkPassivesContainer.append(`
                        <p>아크패시브 비활성화</p>  
                    `);
                }


                characterAllParsing.ArkPassive.Points.forEach(effect => {
                    $('.arkPassives-points').append(`
                          <div class="arkPassives-box">
                            <span class="arkPassives-name">${effect.Name}</span>
                            <span class="arkPassives-value">${effect.Value}</span>
                          </div> 
                        `);
                });

                characterAllParsing.ArkPassive.Effects.forEach(effect => {
                    $('.arkPassives-contents').append(`
                        <div style="display:flex">
                            <img src="${effect.Icon}" alt="">
                            <p>${effect.Description}</p>
                        </div>   
                    `);

                });

                let $cardList = $('.card-list')

                characterAllParsing.ArmoryCard.Cards.forEach(card => {
                    $cardList.append(`
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