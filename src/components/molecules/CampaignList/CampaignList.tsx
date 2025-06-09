import { FC } from 'react';
import { ICampaign } from '../../../helpers/types';
import { Link } from 'react-router-dom';
import './CampaignList.scss';

interface CampaignListProps {
    items: ICampaign[];
}

const CampaignList: FC<CampaignListProps> = ({ items }) => {
    return (
        <div className="campaign-list">
            {items.map((campaign) => (
                <div key={campaign._id} className="campaign-list__item">
                    <Link to={`/campaigns/${campaign._id}`} className="campaign-list__link">
                        <div className="campaign-list__image">
                            {campaign.imageUrl && <img src={campaign.imageUrl} alt={campaign.name["ru"]} />}
                        </div>
                        <div className="campaign-list__content">
                            <h3 className="campaign-list__title">{campaign.name["ru"]}</h3>
                            <p className="campaign-list__description">{campaign.productDescription["ru"]}</p>
                            <div className="campaign-list__meta">
                                <span className="campaign-list__price">${campaign.productPrice}</span>
                                <span className="campaign-list__dates">
                                    {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="campaign-list__tags">
                                {campaign.isPopular && <span className="tag tag--popular">Popular</span>}
                                {campaign.isNew && <span className="tag tag--new">New</span>}
                                {campaign.isFinal && <span className="tag tag--final">Final</span>}
                                {campaign.isCoolPrize && <span className="tag tag--cool">Cool Prize</span>}
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default CampaignList; 