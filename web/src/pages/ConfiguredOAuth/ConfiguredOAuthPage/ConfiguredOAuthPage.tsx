import ConfiguredOAuthCell from 'src/components/ConfiguredOAuth/ConfiguredOAuthCell';

type ConfiguredOAuthPageProps = {
  id: number;
};

const ConfiguredOAuthPage = ({ id }: ConfiguredOAuthPageProps) => {
  return <ConfiguredOAuthCell id={id} />;
};

export default ConfiguredOAuthPage;
